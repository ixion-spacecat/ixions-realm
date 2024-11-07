// Theme Picker based on https://www.aleksandrhovhannisyan.com/blog/the-perfect-theme-switch/
(function () {
  const THEME_OWNER = document.documentElement;
  const THEME_KEY = "theme";
  const THEME_SELECTED_DATE_KEY = "theme_selected_date";
  const DEFAULT_THEME = "default";
  const cachedTheme = localStorage.getItem(THEME_KEY);
  const cachedThemeSelectedDate = Date.parse(
    localStorage.getItem(THEME_SELECTED_DATE_KEY)
  );
  if (cachedTheme) {
    THEME_OWNER.dataset[THEME_KEY] = cachedTheme;
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
        delete THEME_OWNER.dataset[THEME_KEY];
        localStorage.removeItem(THEME_KEY);
      } else {
        THEME_OWNER.dataset[THEME_KEY] = theme;
        localStorage.setItem(THEME_KEY, theme);
      }
    });
  });
})();
