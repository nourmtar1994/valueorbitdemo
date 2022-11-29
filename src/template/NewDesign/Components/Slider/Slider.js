import { Affix, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import * as classes from "./Slider.module.css";

const Slider = ({ children, affixedTop = "-", color = "#fff" }) => {
  const containerRef = useRef(null);
  const [arrows, setArrows] = useState({
    left: true,
    right: true,
  });

  const scrolling = (element) => {
    if (element?.offsetWidth + element?.scrollLeft === element?.scrollWidth) {
      setArrows({
        left: false,
        right: true,
      });
    } else if (
      element?.scrollLeft > 0 &&
      element?.offsetWidth + element?.scrollLeft < element?.scrollWidth
    ) {
      setArrows({
        left: false,
        right: false,
      });
    } else if (element?.scrollLeft === 0) {
      setArrows({
        left: true,
        right: false,
      });
    }
  };
  const scroll = (scrollOffset) => {
    containerRef.current.scrollLeft += scrollOffset;
  };

  useEffect(() => {
    var hasHorizontalScrollbar =
      containerRef.current?.scrollWidth > containerRef.current?.clientWidth;
    if (hasHorizontalScrollbar) {
      setArrows({
        left: true,
        right: false,
      });
    }
  }, []);

  return (
    <Affix offsetTop={affixedTop}>
      <div
        ref={containerRef}
        onScroll={(e) => scrolling(e.target)}
        className={classes.sliderContainer}
        style={{ background: color }}
      >
        <div
          onClick={() => scroll(-150)}
          hidden={arrows?.left}
          className={classes.scrollArrowLeft}
        >
          <FaChevronLeft />
        </div>
        <Space className="bg-white ">{children}</Space>
        <div
          onClick={() => scroll(150)}
          hidden={arrows?.right}
          className={classes.scrollArrowRight}
        >
          <FaChevronRight />
        </div>
      </div>
    </Affix>
  );
};

export default Slider;
