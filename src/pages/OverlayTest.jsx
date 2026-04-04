import React from 'react';
import MindsetOverlayCard from '../components/dashboard/MindsetOverlayCard';

const OverlayTest = () => {
  const cards = [
    "Today, I avoid using the word 'I must'. Instead I use 'I want to' or 'I intend to'.",
    "I am worthy of love and respect, and I treat myself with kindness.",
    "Challenges are opportunities for growth and learning.",
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-10 flex flex-wrap gap-8 justify-center items-center">
      {cards.map((text, index) => (
        <MindsetOverlayCard 
          key={index} 
          text={text} 
          onShare={() => console.log('Sharing:', text)} 
        />
      ))}
    </div>
  );
};

export default OverlayTest;
