"use client";

import { useState } from "react";
import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import About from "../components/sections/About";
import ContactOptions from "../components/sections/ContactOptions";
import Contact from "../components/sections/Contact";
import Footer from "../components/sections/Footer";
import FloatingNav from "../components/layout/FloatingNav";
import FloatingCart from "../components/layout/FloatingCart";
import content from "../data/content.json";

export default function Home() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (serviceTitle: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceTitle)
        ? prev.filter(s => s !== serviceTitle)
        : [...prev, serviceTitle]
    );
  };

  const generateWhatsAppMessage = () => {
    let message = content.messages.whatsappDefault;
    
    if (selectedServices.length > 0) {
      message += content.messages.whatsappWithServices;
      selectedServices.forEach((service, index) => {
        message += `\n${index + 1}. ${service}`;
      });
      message += content.messages.whatsappFooter;
    }
    
    return encodeURIComponent(message);
  };

  const generateContactMessage = () => {
    let message = content.messages.whatsappDefault;
    
    if (selectedServices.length > 0) {
      message += content.messages.whatsappWithServices;
      selectedServices.forEach((service, index) => {
        message += `\n${index + 1}. ${service}`;
      });
      message += content.messages.whatsappFooter;
    }
    
    return message;
  };

  return (
    <>
      <Hero />
      <Services selectedServices={selectedServices} onToggleService={toggleService} />
      <About />      
      <ContactOptions selectedServices={selectedServices} generateWhatsAppMessage={generateWhatsAppMessage} />
      <Contact selectedServices={selectedServices} />
      <Footer generateWhatsAppMessage={generateWhatsAppMessage} generateContactMessage={generateContactMessage}/>
      <FloatingCart selectedServices={selectedServices} />
      <FloatingNav />
    </>
  );
}
