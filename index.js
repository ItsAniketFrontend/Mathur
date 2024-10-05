function textSlider() {
    // DOM Elements
    const slider = document.querySelector(".text-slider");
    const sliderContent = slider.querySelector(".text-slider__content");
    const texts = sliderContent.querySelectorAll("h3");
  
    // Change Text Animation Speed (in pixels per frame)
    const ANIMATION_SPEED = 2;
  
    let sliderWidth = 0;
    let translate = 0;
    let requestId = null;
  
    // Calculate the Initial Width of the Slider
    texts.forEach((text) => {
      // Calculate the bounding rectangle of each text element
      let boundingRect = text.getBoundingClientRect();
      // Accumulate the widths to calculate total slider width
      sliderWidth += boundingRect.width;
    });
  
    // Re-Calculate Width of the Slider on Window Resize
    window.addEventListener("resize", function () {
      // Reset the slider width
      sliderWidth = 0;
      texts.forEach((text) => {
        // Calculate the bounding rectangle of each text element
        let boundingRect = text.getBoundingClientRect();
        // Accumulate the widths to calculate total slider width
        sliderWidth += boundingRect.width;
      });
    });
  
    // Animation function to move the slider
    function animate(timestamp) {
      if (translate <= -sliderWidth / 2) {
        // If half of the slider width is passed, loop back to the beginning
        translate = translate + sliderWidth / 2;
      } else {
        // Move the slider by ANIMATION_SPEED pixels
        translate -= ANIMATION_SPEED;
      }
      // Apply the translation to the slider content
      sliderContent.style.transform = `translate(${translate}px, 0) translateZ(0)`;
      // Request the next animation frame
      requestId = requestAnimationFrame(animate);
    }
  
    // Start the animation loop
    function startAnimation() {
      requestId = requestAnimationFrame(animate);
    }
  
    // Stop the animation loop
    function stopAnimation() {
      cancelAnimationFrame(requestId);
    }
  
    // Start animation on page load
    startAnimation();
  
    // // Pause Animation on slider hover
    // slider.addEventListener("mouseover", stopAnimation);
  
    // // Resume Animation on slider mouse leave
    // slider.addEventListener("mouseout", startAnimation);
  }
  
  // Initialize the text slider
  textSlider();