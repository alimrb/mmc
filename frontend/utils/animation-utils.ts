import SplitType from 'split-type';
import { randomFromTo, randomOf } from './random-utils';
import gsap from 'gsap';
import { generateGradient } from './color-utils';
import { translate } from 'lit-translate';
import { html, render } from 'lit';

export function rotateColor(element: HTMLElement, rotate: number = 10) {
  gsap
    .timeline({ repeat: -1, yoyo: true, repeatRefresh: true })
    .to(element, {
      rotation: function () {
        return randomFromTo(-1 * rotate, rotate);
      },
      duration: function () {
        return randomFromTo(0.2, 0.9);
      },
      transformOrigin: '50% 50%',
      ease: 'sine.inOut',
    })
    .to(element, {
      color: () => randomOf(generateGradient('#ffffff', '#ffff00', 100)),
      duration: () => randomFromTo(0.9, 1.6),
    });
}

export function animateCharsColor(textElement: HTMLElement) {
  const text = new SplitType(textElement, { types: 'chars' });

  text.chars?.forEach((char: any) => {
    rotateColor(char, 10);
  });
}

export function animateWordsColor(textElement: HTMLElement) {
  const text = new SplitType(textElement, { types: 'words' });

  text.words?.forEach((word: any) => {
    rotateColor(word, 3);
  });
}
