const faviconTag = document.getElementById("faviconTag")
const isDark = window.matchMedia("(prefers-color-scheme: dark)")

export const changeFavicon = () => {
    if (isDark.matches) faviconTag.href = "./src/assets/Symbol_White.svg"
    else faviconTag.href = "./src/assets/Symbol.svg"
}