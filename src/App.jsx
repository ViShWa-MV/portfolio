import { useEffect, useState } from "react";
import "./App.css";

import img1 from "./assets/1.png";
import img2 from "./assets/2.png";
import img3 from "./assets/3.png";
import img4 from "./assets/11.png";
import img5 from "./assets/5.jpeg";
import img6 from "./assets/6.jpeg";
import img7 from "./assets/7.jpeg";
import img8 from "./assets/8.jpeg";
import img9 from "./assets/9.jpeg";
import img10 from "./assets/formal-photo.jpg";

export default function App() {
  const [stylepickzImage, setStylepickzImage] = useState(0);
  const [parkingImage, setParkingImage] = useState(0);

  const stylepickzImages = [img1, img2, img3, img4];
  const parkingImages = [img5, img6, img7, img8, img9];

  // Auto-change slideshow images
  useEffect(() => {
    const styleInterval = setInterval(() => {
      setStylepickzImage((prev) => (prev + 1) % stylepickzImages.length);
    }, 3000);

    const parkingInterval = setInterval(() => {
      setParkingImage((prev) => (prev + 1) % parkingImages.length);
    }, 3000);

    return () => {
      clearInterval(styleInterval);
      clearInterval(parkingInterval);
    };
  }, []);

  // IntersectionObserver for section animations
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>

      {/* Home Section */}
      <section id="home" className="hero">
        <div className="profile-pic">
          <img src={img10} alt="Vishwa" />
        </div>
        <h1 className="intro-text">
          Hi, I'm <span className="highlight">Vishwa</span>
        </h1>
        <h2 className="role">
          Aspiring <span className="highlight">Software Tester</span>
        </h2>
        <p className="tagline">
          Passionate about ensuring software quality through meticulous testing,
          bug tracking, and performance optimization. Skilled in manual and
          automated testing with a strong foundation in{" "}
          <span className="neon-text">Full Stack Development</span>.
        </p>
      </section>

      {/* About Section */}
      <section id="about">
        <h2>About Me</h2>
        <p className="about-text">
          I'm <strong>Vishwa</strong>, an aspiring <strong>Software Tester</strong> with a passion for delivering
          high-quality, bug-free applications. I specialize in{" "}
          <strong>manual and automated testing</strong> using tools like
          Selenium, JUnit, and TestNG, and I’m well-versed in creating detailed
          test plans, executing test cases, and documenting defects.
        </p>
        <p className="about-text">
          With a strong foundation in <strong>Java</strong>,{" "}
          <strong>Spring Boot</strong>, and <strong>React.js</strong>, I bridge
          the gap between development and testing. My approach combines
          analytical thinking with creativity to ensure both functional
          excellence and a smooth user experience.
        </p>
        <p className="about-text">
          Outside of work, I enjoy learning new technologies, solving logic
          puzzles, and contributing to open-source projects that make technology
          more reliable and accessible.
        </p>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <h2>Projects</h2>
        <div className="projects">

          {/* Parking Slot Project */}
          <div className="project">
            <h3>Parking Slot Management System</h3>
            <a 
              href="http://ec2-13-61-195-161.eu-north-1.compute.amazonaws.com:8080/login" 
             
            >
              Visit now -))
            </a>
            <p>
              Developed a Spring Boot web application to efficiently manage parking slots. 
              Implemented <strong>REST APIs</strong> for slot availability, booking, and 
              user management. Integrated <strong>MySQL</strong> for database storage 
              and implemented <strong>role-based access control</strong> for admins and users.
            </p>
            <p>
              Features include real-time slot status updates, automated slot allocation, 
              booking history tracking, and an intuitive user interface. This project 
              demonstrates backend development, database integration, and API handling.
            </p>
            <div className="slideshow">
              <img
                src={parkingImages[parkingImage]}
                alt={`Parking Slot ${parkingImage + 1}`}
              />
            </div>
          </div>

          {/* STYLEPICKZ Project */}
          <div className="project">
            <h3>STYLEPICKZ E-Commerce Website</h3>
            <a 
              href="https://stylepicfinal-60038721483.development.catalystserverless.in" 
             
            >
              Visit now -))
            </a>
            <p>
              Built a responsive e-commerce platform for fashion retail using <strong>HTML, CSS, JavaScript</strong>. 
              Users can browse products, add items to a shopping cart, and checkout seamlessly. 
              Integrated search filters, product categorization, and a user-friendly interface.
            </p>
            <p>
              Key features include responsive design for mobile and desktop, dynamic product 
              listings, interactive UI elements, and client-side validation. This project 
              highlights front-end development skills and attention to user experience.
            </p>
            <div className="slideshow">
              <img
                src={stylepickzImages[stylepickzImage]}
                alt={`Stylepickz ${stylepickzImage + 1}`}
              />
            </div>
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2>Connect With Me</h2>
        <p>I'd love to connect and collaborate! You can reach me through:</p>

        <div className="contact-buttons">

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/vishwa-m-b93719324/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn linkedin"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/64/174/174857.png"
              alt="LinkedIn"
              className="icon"
            />
            Connect on LinkedIn
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/ViShWa-MV"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn github"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/64/25/25231.png"
              alt="GitHub"
              className="icon"
            />
            See My Work on GitHub
          </a>

          {/* Email */}
          <a
            href="mailto:mvishwa270@gmail.com"
            className="contact-btn email"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/64/732/732200.png"
              alt="Email"
              className="icon"
            />
            Email Me
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/vishx__a/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn instagram"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/64/2111/2111463.png"
              alt="Instagram"
              className="icon"
            />
            Follow on Instagram
          </a>

        </div>
      </section>
    </div>
  );
}
