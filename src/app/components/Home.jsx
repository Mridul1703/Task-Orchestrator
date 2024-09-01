"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

function useColorChangeEffect() {
  const [isChangingColor, setIsChangingColor] = useState(false);
  const [popupActive, setPopupActive] = useState(false);

  const setColorChange = useCallback((color) => {
    setIsChangingColor(true);
    setPopupActive(true);
  }, []);

  const endColorChange = useCallback(() => {
    setIsChangingColor(false);
    setPopupActive(false);
  }, []);

  return [isChangingColor, setColorChange, endColorChange];
}

const HomePage = () => {
  const text = "TASK ORCHESTRATOR";
  const letters = Array.from(text);
  const [fontSize, setFontSize] = useState("3rem");
  const [descriptionVisible, setDescriptionVisible] = useState(false);

  useEffect(() => {
    function updateFontSize() {
      const width = window.innerWidth;
      if (width <= 480) {
        setFontSize("1.5rem");
      } else if (width <= 768) {
        setFontSize("2rem");
      } else {
        setFontSize("3rem");
      }
    }

    window.addEventListener("resize", updateFontSize);
    updateFontSize();
    return () => window.removeEventListener("resize", updateFontSize);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        padding: "20px",
        "@media (maxWidth: 767px)": {
          height: "auto",
          paddingTop: "0",
          paddingBottom: "20px",
        },
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        onAnimationComplete={() => setDescriptionVisible(true)}
      >
        <div
          style={{
            fontSize: fontSize,
            fontWeight: "bold",
            color: "#45CE4A",
            marginTop: "2",
            marginBottom: "20px",
            "@media (max-width: 767px)": {
              fontSize: "2rem",
              marginBottom: "5px",
            },
          }}
        >
          {letters.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {descriptionVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              fontSize: "1rem",
              fontWeight: "normal",
              color: "#D3D3D3",
              maxWidth: "600px",
              margin: "auto",
              lineHeight: "1.5",
              marginBottom: "40px",
              "@media (max-width: 767px)": {
                fontSize: "0.9rem",
                maxWidth: "90%",
                marginBottom: "30px",
              },
            }}
          >
            A software project management solution , helping you easily track
            and organize tasks by providing you a clear view into ongoing,
            completed, and queued tasks,ensuring that everything runs smoothly.
          </motion.div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            marginTop: "20px",
            flexWrap: "wrap",
            "@media (max-width: 767px)": {
              flexDirection: "column",
              alignItems: "stretch",
              gap: "10px",
            },
          }}
        >
          <CardComponent
            title="Raise a Ticket"
            description="Got a bug in your project? The 'Raise a Ticket' feature lets the admin flag it easily. Once reported, an email is sent to the person responsible for fixing it,helping get it resolved quickly."
          />

          <CardComponent
            title="Plan a Project"
            description="Easily start off with new projects and keep everything organized from start to finish. With this feature, you can add tasks, track what's being worked on,and stay on top of deadlines to make sure your project stays on track."
          />
        </div>
      </motion.div>
    </div>
  );
};

function CardComponent({ title, description }) {
  const [isChangingColor, setColorChange, endColorChange] =
    useColorChangeEffect();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    setColorChange("#008000");
  }, [setColorChange]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    endColorChange();
  }, [endColorChange]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        backgroundColor: "#49535F",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        padding: "20px",
        width: "300px",
        height: "190px",
        cursor: "pointer",
        overflow: "hidden",
        "@media (max-width: 767px)": {
          width: "100%",
          height: "auto",
          padding: "15px",
        },
      }}
      whileHover={{ scale: 1.05 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h3
        style={{
          color: isChangingColor ? "#008000" : "#31CA31",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: "white",
          fontSize: "14px",
          lineHeight: "1.5",
          marginTop: "15px",
        }}
      >
        {description}
      </p>
    </motion.div>
  );
}

export default HomePage;
