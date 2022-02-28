export function getStatusEmoji(status: string = "") {
    return /^dead$/i.test(status)
        ? "💀"
        : /^unknown$/i.test(status)
            ? "❓"
            : "🧬";
}
