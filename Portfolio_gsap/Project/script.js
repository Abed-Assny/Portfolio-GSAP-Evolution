// Mobile nav toggle

let hamberger = document.querySelector(".hambergerurl");
let url = document.querySelector(".url ul");

function mobilenavToggle () {
  hamberger.addEventListener("click", () => {
    hamberger.classList.toggle("active"); 
    url.classList.toggle("active");
  });
}

mobilenavToggle();


// skills

const fills = document.querySelectorAll(".bar-fill");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const target = e.target;
        const percentage = target.dataset.pct;
        
        setTimeout(() => {
          target.style.width = percentage + "%";
          
          const label = target.closest('.bar-wrap').querySelector('.bar-pct');
          if (label) label.innerText = percentage + "%";
        }, 200);

        observer.unobserve(target);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach((f) => observer.observe(f));
} else {

  fills.forEach((f) => {
    f.style.width = (f.dataset.pct || 0) + "%";
  });
}





// // Gsap part 

// // Gsap cod

window.addEventListener("load", () => {

  let mm = gsap.matchMedia();
  mm.add("(min-width: 768px)", () => {



  document.fonts.ready.then(() => {
      
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, DrawSVGPlugin, Draggable, MotionPathPlugin);

      // config
      ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });
      ScrollTrigger.defaults({ fastScrollEnd: true, preventOverlaps: true });
      ScrollTrigger.normalizeScroll(true);

      // تشغيل الوظائف
      loading_page();
      header_hero();
      scrollHorizontal();
      imgEffect();
      skills();
      projectHorizontal();

  });

  // 1. loading_page
  function loading_page() {
      const tl = gsap.timeline({ delay: 0.5 });
      tl.fromTo("path", { drawSVG: "0%" }, {
          drawSVG: "100%",
          duration: 2,
          ease: "power3.inOut",
      })
      .to("#path_loading", { opacity: 0, duration: 0.5 })
      .to(".right_side", { top: "-100%", ease: "none", duration: 0.7 })
      .to(".left_side", { top: "-100%", ease: "none", duration: 0.7 }, "<0.1")
      .set(".loading_page", { pointerEvents: "none", display: "none" });
  }

  // 2. header hero
  function header_hero() {

    const title_p = new SplitText(".title p",{type:"chars, words, lines",})

      const tl_header_hero = gsap.timeline({ delay: 4 });

      tl_header_hero.from(".title h1", { y: 20, opacity: 0, duration: 0.7 })
      
      .from(title_p.words, { opacity: 0, scale: 0.9, duration: 0.1 , stagger:0.1,  mask: "words",}, "<+=0.3")

      .from(".btns p", {
          opacity: 0, x: 50, y: 50, scale: 0.5,
          ease: "back.inOut(1.3)", duration: 0.7,
      },"<")
      .from(".icones", {
          x: 150, opacity: 0, stagger: 0.3,
          ease: "back.inOut(1.3)", duration: 0.7,
      }, "< +=0.5");

      Draggable.create(".icones", {
          bounds: ".hero",
          inertia: true,
          onRelease: function() {
              gsap.to(this.target, { duration: 0.5, x: 0, y: 0 });
          },
      });

      gsap.to("#svggsap", {
          motionPath: { path: "#circlePath_1", align: "#circlePath_1", autoRotate: true, alignOrigin: [0.5, 0.5] },
          duration: 10, repeat: -1, ease: "none"
      });
  }

  // 
  function scrollHorizontal() {
      const sections = gsap.utils.toArray(".sections");

      // 
      // scroll hiroziatal
      gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
              trigger: ".scrollHerozental",
              pin: true,
              scrub: 2,
              start: "top top",
              end: () => "+=" + document.querySelector(".scrollHerozental").offsetWidth,
              invalidateOnRefresh: true 
          }
      });

      // (Sobre Me)
      const sobremeSplit = new SplitText("#sobreme", {type:"chars, words, lines"});
      const tl_sec1 = gsap.timeline({
          scrollTrigger:{
              trigger:".scrollHerozental",
              start:"top 90%",
              end:"+=80%",
              scrub:1,
          },
      });

      tl_sec1.from(sobremeSplit.chars, {
          y:-100, x:-100, stagger:0.3, opacity:0,
          ease:"power3.in", rotateX:-90,
      })
      // icones
      .to(".html", { top:"570%", left:"152%", }, "<")
      .to(".css", { top:"739%", left:"130%" }, "<")
      .to(".js", { top:"918%", left:"108%" }, "<")
      .to(".gsap", { top:"1085%", left:"86%" }, "<")
      .to(".php", { top:"1231%", left:"64%" }, "<");

      // 
      const tl_sec2 = gsap.timeline({
          scrollTrigger:{
              trigger:".scrollHerozental .section1", 
              start:"top -4%",
              end:"+=110%",
              scrub:1,
          },
      });

      const contant_sec2P = new SplitText(".contant_sec2 p", {
        type: "lines, words, chars",
        autoSplit: true,
        onSplit: (self) => {
          return gsap.from(self.lines, {
            y: 100,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power4.out"
          });
        }
      });

      tl_sec2.to(".icones", { opacity: 0, duration: 0.1 }) 
      .from(".contant_sec2 h3", { opacity: 0, y: 90, ease: "power3.in" })

      .from(contant_sec2P.words, { opacity: 0, y: 90, ease: "power3.in", stagger:0.3, }, "<")

      .from(".icones1_sec22", {
          y: 100, x: -100, opacity: 0,
          ease: "power1.inOut",
          stagger: 0.2
      }, "0");
  }

  // 4.imgEffect
  function imgEffect() {
      gsap.to(".imgEffect img", {
          yPercent: -20, scale: 1.15, ease: "none",
          scrollTrigger: { trigger: ".imgEffect", start: "top bottom", end: "bottom top", scrub: 1.5 }
      });
  }

  // 5 (Skills) 
  function skills() {

    const tl_skill = gsap.timeline({
      scrollTrigger: {
        trigger: "#skills",
        start: "top 50%",
        end: "+=85%",
        scrub:1,
        
    }
    });

    tl_skill.from(".left", {
        x: -150,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
    })

    .from(".card", {
      x: 150,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power2.out",
    },"<")
};

// project Herozintal 

function projectHorizontal() {
  const projects = gsap.utils.toArray(".project");

  let scrollHorizontal = gsap.to(projects, {
    xPercent: -100 * (projects.length - 1),
    ease: "none",
    duration: 1,
    scrollTrigger: {
      trigger: ".projectHerozintal",
      pin: true,
      scrub: 0.5,

      end: () => "+=" + (document.querySelector(".project").offsetWidth * projects.length),
    },
  });

  
  const project_h2 = new SplitText(".project_h2 h2", {
    type: "chars, words",
  });

  gsap.from(project_h2.chars, {
    y: -100, x: -100, stagger: 0.3, opacity: 0,
    ease: "power3.in", rotateX: -90,
    scrollTrigger: {
      trigger: ".project_h2",
      start: "top 80%",
      end: "+=80%",
      scrub: true,
    },
  });


  const articles = gsap.utils.toArray(".projectArticle");

  articles.forEach((article, index) => {
    let triggerElement = article.parentElement;

    gsap.fromTo(article, {
      x: 200,
      opacity: 0,
      rotateX:-90,
    }, {
      x: 0,
      opacity: 1,
      scale: 1.5,
      rotateX:0,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: triggerElement,
    
        containerAnimation: scrollHorizontal, 
        start: "left 100%", 
        end: "left 5%",
        scrub: true,
      },
    });
  });
}




});

});

// 

// 

// mobil

let forMobil = gsap.matchMedia();
forMobil.add("(max-width: 770px)", () => {

  document.fonts.ready.then(() => {
      
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, DrawSVGPlugin, Draggable, MotionPathPlugin);

    // config
    ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });
    ScrollTrigger.defaults({ fastScrollEnd: true, preventOverlaps: true });
    ScrollTrigger.normalizeScroll(true);

    // تشغيل الوظائف
    loading_page();
    header_hero();
    scrollHorizontal();
    imgEffect();
    skills();
    projectHorizontal();

});

  // 1. loading_page
  function loading_page() {
    const tl = gsap.timeline({ delay: 0.5 });
    tl.fromTo("path", { drawSVG: "0%" }, {
        drawSVG: "100%",
        duration: 2,
        ease: "power3.inOut",
    })
    .to("#path_loading", { opacity: 0, duration: 0.5 })
    .to(".right_side", { top: "-100%", ease: "none", duration: 0.7 })
    .to(".left_side", { top: "-100%", ease: "none", duration: 0.7 }, "<0.1")
    .set(".loading_page", { pointerEvents: "none", display: "none" });
};

// 2. header hero
function header_hero() {

  const title_p = new SplitText(".title p",{type:"chars, words, lines",})

    const tl_header_hero = gsap.timeline({ delay: 4 });

    tl_header_hero.from(".title h1", { y: 20, opacity: 0, duration: 0.7 })
    
    .from(title_p.words, { opacity: 0, scale: 0.9, duration: 0.1 , stagger:0.1,}, "<+=0.3")

    .from(".btns p", {
        opacity: 0, x: 50, y: 50, scale: 0.5,
        ease: "back.inOut(1.3)", duration: 0.7,
    },"<")
    .from(".icones", {
        x: 150, opacity: 0, stagger: 0.3,
        ease: "back.inOut(1.3)", duration: 0.7,
    }, "< +=0.5");

    Draggable.create(".icones", {
        bounds: ".hero",
        inertia: true,
        onRelease: function() {
            gsap.to(this.target, { duration: 0.5, x: 0, y: 0 });
        },
    });
};


// 
function scrollHorizontal() {
  const sections = gsap.utils.toArray(".sections");

  // 
  // scroll hiroziatal
  gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
          trigger: ".scrollHerozental",
          pin: true,
          scrub: true,
          start: "top top",
          end: () => "+=" + document.querySelector(".scrollHerozental").offsetWidth,
          invalidateOnRefresh: true 
      }
  });

  // (Sobre Me)
  const sobremeSplit = new SplitText("#sobreme", {type:"chars, lines"});
  const tl_sec1 = gsap.timeline({
      scrollTrigger:{
          trigger:".scrollHerozental",
          start:"top 90%",
          end:"+=80%",
          scrub:0.5,
      },
  });

  tl_sec1.from(sobremeSplit.chars, {
      y:-100, x:-100, stagger:0.3, opacity:0,
      ease:"power3.in", rotateX:-90,
  })
};

  // 4.imgEffect
  function imgEffect() {
    gsap.to(".imgEffect img", {
        yPercent: -20, scale: 1.15, ease: "none",
        scrollTrigger: { trigger: ".imgEffect", start: "top bottom", end: "bottom top", scrub: 1.5 }
    });
};

// 5 (Skills) 
function skills() {

  const tl_skill = gsap.timeline({
    scrollTrigger: {
      trigger: "#skills",
      start: "top 50%",
      end: "+=200%",
      scrub:1,
  }
  });

  tl_skill.from(".left", {
      x: -150,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power2.out",
  })

  .from(".card", {
    x: 150,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
    ease: "power2.out",
  })
};

// project Herozintal 

function projectHorizontal() {
  const projects = gsap.utils.toArray(".project");

  let scrollHorizontal = gsap.to(projects, {
    xPercent: -100 * (projects.length - 1),
    ease: "none",
    duration: 1,
    scrollTrigger: {
      trigger: ".projectHerozintal",
      pin: true,
      scrub: 0.5,

      end: () => "+=" + (document.querySelector(".project").offsetWidth * projects.length),
    },
  });

  
  const project_h2 = new SplitText(".project_h2 h2", {
    type: "chars, words",
  });

  gsap.from(project_h2.chars, {
    y: -100, x: -100, stagger: 0.3, opacity: 0,
    ease: "power3.in", rotateX: -90,
    scrollTrigger: {
      trigger: ".project_h2",
      start: "top 80%",
      end: "+=80%",
      scrub: true,
    },
  });


  const articles = gsap.utils.toArray(".projectArticle");

  articles.forEach((article, index) => {
    let triggerElement = article.parentElement;

    gsap.fromTo(article, {
      x: 200,
      opacity: 0,
      rotateX:-90,
    }, {
      x: 0,
      opacity: 1,
      rotateX:0,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: triggerElement,
    
        containerAnimation: scrollHorizontal, 
        start: "left 100%", 
        end: "left 5%",
        scrub: true,
      },
    });
  });
}

})