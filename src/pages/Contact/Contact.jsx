const Contact = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-5">Contact Us</h1>
      <p className="text-gray-600 mb-8">Need help? Send us a message.</p>
      <div className="max-w-xl space-y-4">
        <input className="input input-bordered w-full" type="text" placeholder="Your name" />
        <input className="input input-bordered w-full" type="email" placeholder="Your email" />
        <textarea className="textarea textarea-bordered w-full h-32" placeholder="Your message"></textarea>
        <button className="btn btn-primary">Send Message</button>
      </div>
    </div>
  );
};

export default Contact;
