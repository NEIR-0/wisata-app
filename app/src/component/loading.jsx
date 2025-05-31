function Loading() {
    return (
        <svg className="h-full w-full text-blue-500" viewBox="0 0 135 140" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <rect y="10" width="15" height="120" rx="6">
            <animate attributeName="height" begin="0.1s" dur="1s" values="120;20;120" repeatCount="indefinite" />
            <animate attributeName="y" begin="0.1s" dur="1s" values="10;60;10" repeatCount="indefinite" />
            </rect>
            <rect x="30" y="10" width="15" height="120" rx="6">
            <animate attributeName="height" begin="0.2s" dur="1s" values="120;20;120" repeatCount="indefinite" />
            <animate attributeName="y" begin="0.2s" dur="1s" values="10;60;10" repeatCount="indefinite" />
            </rect>
            <rect x="60" y="10" width="15" height="120" rx="6">
            <animate attributeName="height" begin="0.3s" dur="1s" values="120;20;120" repeatCount="indefinite" />
            <animate attributeName="y" begin="0.3s" dur="1s" values="10;60;10" repeatCount="indefinite" />
            </rect>
        </svg>
    );
}

export default Loading;