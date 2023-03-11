function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`
    }
    return `rgb(var(${variable}) / ${opacityValue})`
  }
}

module.exports = {
  content: ["./src/**/*.{tsx,ts,html}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        "poppins": ["Poppins"]
      },
      colors: {
        "paper": withOpacityValue("--paper"),
        "paper-light": withOpacityValue("--paper-light"),
        "base-color":  withOpacityValue("--base-color"),
        "neutral": withOpacityValue("--neutral"),
        "neutral-light": withOpacityValue("--neutral-light"),
        "neutral-extra-light": withOpacityValue("--neutral-extra-light"),
        "neutral-dark": withOpacityValue("--neutral-dark"),
        "primary": withOpacityValue("--primary"),
        "primary-light": withOpacityValue("--primary-light"),
        "primary-dark": withOpacityValue("--primary-dark"),
        "front-end": withOpacityValue("--category-front-end"),
        "back-end": withOpacityValue("--category-back-end"),
        "algorithm": withOpacityValue("--category-algorithm"),
        "setup": withOpacityValue("--category-setup"),
        "database": withOpacityValue("--category-database"),
        "soft-skills": withOpacityValue("--category-soft-skills")
      },
    },
  },
  plugins: [],
};
