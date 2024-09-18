import { useEffect, useRef, useState } from "react";
import type { Headings } from ".";

type Point = { id: string; top: number };

export default function useActiveHeading(headings: Headings) {
  const [active, setActive] = useState<string>();

  // 排好序的标题坐标点，方便范围查找
  const points = useRef<Point[]>([]);

  useEffect(() => {
    // 获取标题位置
    if (headings) {
      points.current = [];
      const { top: winScrollTop } =
        document.documentElement.getBoundingClientRect();
      headings.forEach(({ text: id }) => {
        const title = document.querySelector(`#${id}`);
        if (title) {
          const top = winScrollTop + title.getBoundingClientRect().top;
          const point = { id, top };
          // 由于headings是排好序的，按顺序推入就行
          points.current.push(point);
        }
      });
    }
  }, [headings]);

  useEffect(() => {
    const onScrollChange = () => {
      const { top } = document.documentElement.getBoundingClientRect();
      const offsetHeight = document.documentElement.offsetHeight;
      let target: string | null = null;
      for (const [index, point] of Object.entries(points.current)) {
        if (point.top + top > 0) {
          target = point.id;
          break;
        }
        // 下一个出现在可视窗口之前都算处于上一个
        if (point.top + top > offsetHeight) {
          const prePoint =
            points.current.at(Number(index) - 1) || points.current.at(0);
          if (prePoint) {
            target = prePoint.id;
          }
          break;
        }
      }
      if (target) {
        setActive(target);
      }
    };
    window.addEventListener("scroll", onScrollChange);
    onScrollChange();

    return () => {
      window.removeEventListener("scroll", onScrollChange);
    };
  }, []);

  return active;
}
