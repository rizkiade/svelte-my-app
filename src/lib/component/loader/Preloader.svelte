<style>

    .loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(61, 61, 61, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .logo {
        width: 48px;
        height: 48px;
    }

    .loading-bar {
        width: 130px;
        height: 2px;
        background: #cfcfcf;
        margin-top: 22px;
        position: relative;
        overflow: hidden;
        border-radius: 10px;
    }

    .loading-bar::before {
        content: '';
        width: 68px;
        height: 2px;
        background: #0073b1;
        position: absolute;
        left: -34px;
        animation: bluebar 1.5s infinite ease;
    }

    @keyframes bluebar {
        50% {
            left: 96px;
        }
    }
</style>

<div class="loading-screen">
    <div class="loading-animation">
        <img src="/favicon.png" alt="" class="logo">
        <div class="loading-bar"></div>
    </div>
</div>
