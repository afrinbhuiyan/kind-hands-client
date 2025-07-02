import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheck, FiChevronRight, FiClock, FiPlus, FiMinus } from 'react-icons/fi';
import { FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [activeMethod, setActiveMethod] = useState('email');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef(null);

  const contactMethods = [
    {
      id: 'email',
      icon: <FiMail className="text-xl" />,
      title: "Email",
      subtitle: "For formal inquiries",
      details: "contact@volunteerhub.com",
      action: "Mail us directly",
      color: "text-[#6bd3f3]"
    },
    {
      id: 'phone',
      icon: <FiPhone className="text-xl" />,
      title: "Phone",
      subtitle: "Immediate assistance",
      details: "+1 (555) 123-4567",
      action: "Call our team",
      color: "text-[#024870]"
    },
    {
      id: 'office',
      icon: <FiMapPin className="text-xl" />,
      title: "Office",
      subtitle: "In-person meetings",
      details: "123 Volunteer Ave, Suite 400",
      action: "Get directions",
      color: "text-[#6bd3f3]"
    }
  ];

  const socialMedia = [
    {
      icon: <FaLinkedinIn />,
      name: "LinkedIn",
      url: "#"
    },
    {
      icon: <FaTwitter />,
      name: "Twitter",
      url: "#"
    },
    {
      icon: <FaInstagram />,
      name: "Instagram",
      url: "#"
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Premium Header */}
      <header className="bg-[#024870] text-white py-16">
        <div className="container mx-auto px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-light mb-4">Contact Our <span className="font-medium">Executive Team</span></h1>
            <div className="w-20 h-1 bg-[#6bd3f3] mb-6"></div>
            <p className="text-xl text-white/80 max-w-2xl">
              We prioritize every inquiry with the highest level of attention and professionalism.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-20 -mt-20 relative z-10">
        {/* Luxury Card Container */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left Panel - Contact Methods */}
            <div className="bg-gray-50 p-10 border-r border-gray-200">
              <h2 className="text-2xl font-light text-[#024870] mb-8">Preferred Contact Method</h2>
              
              <div className="space-y-4">
                {contactMethods.map((method) => (
                  <motion.div
                    key={method.id}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <button
                      onClick={() => setActiveMethod(method.id)}
                      className={`w-full text-left p-6 rounded-lg transition-all ${activeMethod === method.id ? 'bg-white shadow-md border border-[#024870]/10' : 'hover:bg-white/50'}`}
                    >
                      <div className="flex items-start">
                        <div className={`p-3 rounded-full ${method.color} bg-opacity-10 mr-4`}>
                          {method.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{method.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{method.subtitle}</p>
                          <p className="text-[#024870] font-medium mt-2">{method.details}</p>
                          <div className="flex items-center mt-3 text-[#6bd3f3] text-sm font-medium">
                            {method.action}
                            <FiChevronRight className="ml-1" />
                          </div>
                        </div>
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Social Media */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Connect Socially</h3>
                <div className="flex space-x-4">
                  {socialMedia.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      whileHover={{ y: -3 }}
                      className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm border border-gray-200 text-[#024870] hover:text-[#6bd3f3] transition-colors"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel - Form */}
            <div className="lg:col-span-2 p-10">
              <div className="max-w-lg mx-auto">
                <h2 className="text-3xl font-light text-[#024870] mb-2">
                  {activeMethod === 'email' && 'Email Inquiry'}
                  {activeMethod === 'phone' && 'Schedule a Call'}
                  {activeMethod === 'office' && 'Request a Meeting'}
                </h2>
                <p className="text-gray-600 mb-8">
                  {activeMethod === 'email' && 'Our team typically responds within 24 hours.'}
                  {activeMethod === 'phone' && 'Available Monday-Friday, 9AM-5PM EST.'}
                  {activeMethod === 'office' && 'By appointment only, please request below.'}
                </p>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-[#6bd3f3]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FiCheck className="text-2xl text-[#024870]" />
                    </div>
                    <h3 className="text-xl font-medium text-[#024870] mb-2">Request Received</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Thank you for reaching out. A member of our executive team will respond promptly.
                    </p>
                  </motion.div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-b border-gray-300 focus:border-[#024870] outline-none transition-colors"
                        placeholder="John Smith"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-b border-gray-300 focus:border-[#024870] outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>

                    {activeMethod === 'phone' && (
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="w-full px-4 py-3 border-b border-gray-300 focus:border-[#024870] outline-none transition-colors"
                          placeholder="+1 (___) ___-____"
                        />
                      </div>
                    )}

                    {activeMethod === 'office' && (
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          className="w-full px-4 py-3 border-b border-gray-300 focus:border-[#024870] outline-none transition-colors"
                        />
                      </div>
                    )}

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        {activeMethod === 'email' && 'Your Message'}
                        {activeMethod === 'phone' && 'Call Purpose'}
                        {activeMethod === 'office' && 'Meeting Agenda'}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-b border-gray-300 focus:border-[#024870] outline-none transition-colors resize-none"
                        placeholder={activeMethod === 'email' ? 'How can we assist you?' : 'Please provide details'}
                      />
                    </div>

                    <div className="pt-4">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 py-4 bg-[#024870] text-white font-medium rounded-lg hover:bg-[#01314d] transition-colors flex items-center justify-center"
                      >
                        {activeMethod === 'email' && 'Send Message'}
                        {activeMethod === 'phone' && 'Request Call'}
                        {activeMethod === 'office' && 'Schedule Meeting'}
                        <FiSend className="ml-2" />
                      </motion.button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Executive Assurance Section */}
        <div className="mt-20 bg-[#f8fafc] p-12 rounded-lg border border-[#024870]/10">
          <div className="container mx-auto text-center">
            <div className="w-16 h-16 bg-[#024870] rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheck className="text-2xl text-white" />
            </div>
            <h2 className="text-2xl font-light text-[#024870] mb-4">Executive Assurance</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Every inquiry receives personal attention from our leadership team. We guarantee a response within 
              24 hours or your next month's service is on us.
            </p>
          </div>
        </div>
      </main>

      {/* Global Headquarters */}
<section className="bg-gradient-to-br from-[#024870] to-[#6bd3f3] text-white py-20 relative overflow-hidden">
  {/* Decorative elements */}
  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#024870]/20 rounded-full blur-3xl"></div>
  
  <div className="container mx-auto px-6 relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-light mb-4">Our Global Headquarters</h2>
        <div className="w-20 h-1 bg-white mb-8"></div>
        
        <address className="not-italic space-y-6">
          <div className="space-y-2">
            <p className="text-xl font-medium">VolunteerHub International</p>
            <p className="flex items-center">
              <FiMapPin className="mr-2 text-[#6bd3f3]" />
              123 Executive Boulevard
            </p>
            <p>Suite 1500</p>
            <p>New York, NY 10001</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-xl font-medium mt-6">Office Hours</p>
            <div className="flex items-center">
              <FiClock className="mr-2 text-[#6bd3f3]" />
              <div>
                <p>Monday-Friday: 8:30AM - 5:30PM EST</p>
                <p>Saturday-Sunday: Closed</p>
              </div>
            </div>
          </div>

          <button className="mt-6 px-6 py-3 bg-white text-[#024870] rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center">
            Get Directions <FiChevronRight className="ml-2" />
          </button>
        </address>
      </motion.div>
      
      <motion.div 
        className="h-96 rounded-xl overflow-hidden border-4 border-white shadow-2xl relative"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Map placeholder with animated pin */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#024870] to-[#6bd3f3] flex items-center justify-center">
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-center"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#024870] shadow-lg">
                <FiMapPin className="text-xl" />
              </div>
              <div className="absolute -inset-2 bg-white/30 rounded-full animate-ping"></div>
            </div>
            <p className="mt-6 text-white font-medium">Interactive Map Loading</p>
          </motion.div>
        </div>
        
        {/* Map overlay controls */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#024870] shadow-md hover:bg-gray-100 transition-colors">
            <FiPlus />
          </button>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#024870] shadow-md hover:bg-gray-100 transition-colors">
            <FiMinus />
          </button>
        </div>
      </motion.div>
    </div>
  </div>
</section>
    </div>
  );
};

export default ContactPage;