const faqs = [
  {
    question: 'How do I book an event?',
    answer: 'Browse the catalog, choose your event, and use the booking form to reserve tickets.'
  },
  {
    question: 'Can I cancel a booking?',
    answer: 'Yes. Visit My Bookings and cancel any upcoming reservation before the event starts.'
  },
  {
    question: 'Are tickets refundable?',
    answer: 'Refund policies vary by organizer, so please check the event details for the latest information.'
  }
];

const FAQ = () => (
  <section>
    <h1>Frequently Asked Questions</h1>
    <div>
      {faqs.map((item) => (
        <div key={item.question}>
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FAQ;
