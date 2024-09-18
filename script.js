document.addEventListener("DOMContentLoaded", function () {
    const sliderContent = ["Verdant", "Zephyr", "Canopy", "Boreal"];
    const totalImages = 8; // Number of images available
    const slider = document.querySelector(".slider");
    let activeSlide = 0;
  
    document.addEventListener("click", function () {
      const currentSlide = slider.querySelector(".slide:not(.exiting)");
      const slideTheme = activeSlide % 2 ? "dark" : "light";
      activeSlide = (activeSlide + 1) % sliderContent.length;
  
      // Animate out the current slide (if it exists)
      if (currentSlide) {
        const existingImgs = currentSlide.querySelectorAll("img"); // Select all images
        gsap.to(existingImgs, {
          top: "0%", // Move images out
          duration: 1.5,
          ease: "power4.inOut",
        });
        currentSlide.classList.add("exiting");
      }
  
      // Create the new slide
      const newSlide = document.createElement("div");
      newSlide.classList.add("slide", slideTheme);
      newSlide.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
  
      // Image 1
      const newSlideImg1 = document.createElement("div");
      newSlideImg1.className = "slider-img slide-img-1";
      const img1 = document.createElement("img");
      img1.src = `/Assets/Img/slider-${(activeSlide % totalImages) + 4}.jpg`; // Looping images
      img1.style.top = "100%"; // Start at the bottom for animation
      newSlideImg1.appendChild(img1);
      newSlide.appendChild(newSlideImg1);
  
      // Text Content
      const newSlideContent = document.createElement("div");
      newSlideContent.classList.add("slide-content");
      newSlideContent.innerHTML = `<h1 style="scale: 1.5">${sliderContent[activeSlide]}</h1>`;
      newSlide.appendChild(newSlideContent);
  
      // Image 2
      const newSlideImg2 = document.createElement("div");
      newSlideImg2.className = "slider-img slide-img-2";
      const img2 = document.createElement("img");
      img2.src = `/Assets/Img/slider-${(activeSlide % totalImages) + 2}.jpg`; // Same loop logic
      img2.style.top = "100%"; // Start at the bottom for animation
      newSlideImg2.appendChild(img2);
      newSlide.appendChild(newSlideImg2);
  
      // Append the new slide to the slider
      slider.appendChild(newSlide);
  
      // Animate the new slide in
      gsap.to(newSlide, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.5,
        ease: "power4.inOut",
        onStart: () => {
          gsap.to([img1, img2], {
            top: "50%", // Move images to the center
            duration: 1.5,
            ease: "power4.inOut",
          });
        },
        onComplete: () => {
          removeExtraSlide(slider);
        },
      });
  
      // Animate the text (slide content)
      gsap.to(".slide-content h1", {
        scale: 1,
        duration: 1.5,
        ease: "power4.inOut",
      });
    });
  
    // Remove extra slides to prevent overcrowding
    function removeExtraSlide(container) {
      while (container.children.length > 4) { // Keep only the last 4 slides
        container.removeChild(container.firstChild); // Properly remove the first child
      }
    }
  });
  