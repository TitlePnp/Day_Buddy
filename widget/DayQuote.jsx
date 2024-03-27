import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

const DayQuote = () => {
  const greetingQuotes = [
    'Hi, how are you? 😊',
    'Good morning! ☕',
    'Hey there! 👋',
    'Happy Friday! 🎉',
    'Hola! 👋',
    'Hi, friend! 🌟',
    'Morning vibes! 🌅',
    'Hello world! 🌍',
    'Cheers to you! 🥂',
    'Bonjour! 🇫🇷',
    'What\'s up? 🖐️',
    'Smile today! 😄',
    'Greetings! 🌺',
    'Hey you! 👀',
    'Nice to see you! 👋',
    'Hey, sunshine! ☀️',
    'Hola amigo! 👋',
    'Hello, Buddy~! 🌟',
    'Wassup? 🤘',
    'Aloha! 🌺',
  ];

// สร้าง State เพื่อเก็บคำทักทายที่สุ่มได้
const [randomGreeting, setRandomGreeting] = useState('');

// สร้างฟังก์ชันสำหรับสุ่มคำทักทาย
const getRandomGreeting = () => {
  const randomIndex = Math.floor(Math.random() * greetingQuotes.length);
  return greetingQuotes[randomIndex];
};

// ใช้ useEffect เพื่อสุ่มคำทักทายเมื่อคอมโพเนนต์ถูกโหลด
useEffect(() => {
  const initialRandomGreeting = getRandomGreeting();
  setRandomGreeting(initialRandomGreeting);
}, []); // ระบุว่าต้องการให้ useEffect ทำงานครั้งเดียวเมื่อคอมโพเนนต์ถูกโหลด

return (
  <View>
    <Text style={[{ fontFamily: 'LSregular', fontSize: 17 }]}>{randomGreeting}</Text>
  </View>
);
};

export default DayQuote;
