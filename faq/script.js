const faqData = [
  {
    question: "What is the purpose of this FAQ?",
    answer:
      "This FAQ is designed to provide answers to common questions about our services and features. It aims to help users quickly find the information they need without having to contact support.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "To reset your password, go to the login page and click on 'Forgot Password?'. Follow the instructions sent to your registered email address to create a new password.",
  },
  {
    question: "Where can I find the user manual?",
    answer:
      "The user manual can be found in the 'Help' section of our website. You can also download it as a PDF for offline access.",
  },
  {
    question: "How do I contact customer support?",
    answer: "You can contact customer support via email at",
  },
  {
    question: "What are the system requirements for using this service?",
    answer:
      "The minimum system requirements include a modern web browser (Chrome, Firefox, Safari, or Edge) and an internet connection. For optimal performance, we recommend using the latest version of your browser.",
  },
  {
    question: "Can I use this service on mobile devices?",
    answer:
      "Yes, our service is fully responsive and can be accessed on mobile devices. We recommend using the latest version of your mobile browser for the best experience.",
  },
];

const accordionContainer = document.getElementById("accordion");
function generateAccordionItems(faqData) {
  faqData.forEach((item) => {
    const accordionItem = document.createElement("div");

    accordionItem.classList.add("accordion-item");
    const header = document.createElement("button");
    header.classList.add("accordion-header");
    header.textContent = item.question;
    const content = document.createElement("div");
    content.classList.add("accordion-content");

    const contentText = document.createElement("p");
    contentText.textContent = item.answer;

    content.appendChild(contentText);
    accordionItem.appendChild(header);
    accordionItem.appendChild(content);

    accordionContainer.appendChild(accordionItem);
  });
}
generateAccordionItems(faqData);

const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    header.classList.toggle("active");
    const accordionContent = header.nextElementSibling;

    if (header.classList.contains("active")) {
      accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
    } else {
      accordionContent.style.maxHeight = 0;
    }

    accordionHeaders.forEach((otherHeader) => {
      if (otherHeader !== header && otherHeader.classList.contains("active")) {
        otherHeader.classList.remove("active");
        otherHeader.nextElementSibling.style.maxHeight = 0;
      }
    });
  });
});
