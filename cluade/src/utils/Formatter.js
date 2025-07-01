export class Formatter {
    static formatTime(seconds) {
        if (seconds === Infinity) return '--:--';
        
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    static formatNumber(num) {
        return new Intl.NumberFormat('he-IL').format(num);
    }

    static formatPercentage(num) {
        return `${num.toFixed(1)}%`;
    }

    static formatDate(date) {
        return new Intl.DateTimeFormat('he-IL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(date));
    }

    static truncateText(text, maxLength = 50) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength - 3) + '...';
    }
}