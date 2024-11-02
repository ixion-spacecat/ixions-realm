// Theme Picker based on https://www.aleksandrhovhannisyan.com/blog/the-perfect-theme-switch/
(function () {
  const THEME_STORAGE_KEY = "theme";
  const THEME_OWNER = document.documentElement;
  const DEFAULT_THEME = "default";
  const cachedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (cachedTheme) {
    THEME_OWNER.dataset[THEME_STORAGE_KEY] = cachedTheme;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const themePicker = document.getElementById("theme-picker");
    if (!themePicker) {
      return;
    }
    const initialTheme = cachedTheme ?? DEFAULT_THEME;
    if (themePicker.querySelector(`option[value="${initialTheme}"]`)) {
      themePicker.value = initialTheme;
    } else {
      themePicker.value = DEFAULT_THEME;
    }

    themePicker.addEventListener("change", (e) => {
      const theme = e.target.value;
      if (theme === DEFAULT_THEME) {
        delete THEME_OWNER.dataset[THEME_STORAGE_KEY];
        localStorage.removeItem(THEME_STORAGE_KEY);
      } else {
        THEME_OWNER.dataset[THEME_STORAGE_KEY] = theme;
        localStorage.setItem(THEME_STORAGE_KEY, theme);
      }
    });
  });
})();
