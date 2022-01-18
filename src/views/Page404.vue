<template>
    <div class="hit-the-floor">404</div>
</template>

<script>
    export default {
        name: "Page404"
    }
</script>

<style scoped>
    .hit-the-floor {
        animation: change_colors 6s infinite;
        color: white;
        font-size: 10vw;
        font-weight: bold;
        text-shadow:
                0 .005em 0 rgba(0, 0, 0, .2),
                0 .005em 0 currentColor,

                0 .01em 0 rgba(0, 0, 0, .25),
                0 .01em 0 currentColor,

                0 .015em 0 rgba(0, 0, 0, .3),
                0 .015em 0 currentColor,

                0 .02em 0 rgba(0, 0, 0, .35),
                0 .02em 0 currentColor,

                0 .025em 0 rgba(0, 0, 0, .4),
                0 .025em 0 currentColor,

                0 .03em .005em rgba(0, 0, 0, .1),
                0 0 .025em rgba(0, 0, 0, .1),
                0 .005em .015em rgba(0, 0, 0, .3),
                0 .015em .025em rgba(0, 0, 0, .2),
                0 .025em .05em rgba(0, 0, 0, .25),
                0 .05em .05em rgba(0, 0, 0, .2),
                0 .1em .1em rgba(0, 0, 0, .15);
    }

    @keyframes change_colors {
        0% { color: #ff4444; }
        12% { color: #ffbb33; }
        25% { color: #00C851; }
        37% { color: #33b5e5; }
        50% { color: #aa66cc; }
        62% { color: #4B515D; }
        75% { color: #3F729B; }
        87% { color: #2BBBAD; }
        100% { color: #4285F4; }
    }
</style>