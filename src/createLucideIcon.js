/**
 * @license lucide-omi v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

import { h } from 'omi';
import defaultAttributes from './defaultAttributes.js';

const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase().trim();

const handleAttributes = (attrs) => {
  const newAttrs = {};
  for (let key in attrs) {
    newAttrs[key] = attrs[key];
    if (/[A-Z]/.test(key)) {
      newAttrs[toKebabCase(key)] = attrs[key];
    }
  }
  return newAttrs;
};

const createLucideIcon = (iconName, iconNode) => {
  const Component = ({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, ...rest }) => {
    const handledRest = handleAttributes(rest);
    return h(
      "svg",
      {
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        'stroke-width': absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: ["lucide", `lucide-${toKebabCase(iconName)}`, className].join(" "),
        ...handledRest
      },
      [
        ...iconNode.map(([tag, attrs]) => h(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    );
  };
  return Component;
};

export { createLucideIcon as default, toKebabCase };
//# sourceMappingURL=createLucideIcon.js.map
