import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);

    axiosSecure
      .get(`/payments/${user.email}`)
      .then((res) => {
        setPayments(res.data || []);
      })
      .catch((error) => {
        console.log(error);
        setPayments([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user?.email, axiosSecure]);

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading payment history...
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">
        Payment History
      </h2>

      {payments.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <p className="text-gray-500">
            No payment history found.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Order ID</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment._id || index}>
                  <td>{index + 1}</td>

                  <td>
                    {payment.transactionId ||
                      payment.transactionID ||
                      "N/A"}
                  </td>

                  <td>
                    {payment.orderId || "N/A"}
                  </td>

                  <td>
                    ${Number(payment.amount || 0).toFixed(2)}
                  </td>

                  <td>
                    {payment.method || "Stripe"}
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        payment.status === "Paid"
                          ? "badge-success"
                          : payment.status === "Failed"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {payment.status || "Pending"}
                    </span>
                  </td>

                  <td>
                    {payment.date
                      ? new Date(
                          payment.date
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;