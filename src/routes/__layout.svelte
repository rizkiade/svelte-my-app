<script lang="ts">
	import Header from "$lib/header/Header.svelte";
	import "../app.css";
	import { FlatToast, ToastContainer, toasts } from "svelte-toasts";
</script>

<Header />

<ToastContainer {toasts} let:data={data}>
  <FlatToast {data} />
</ToastContainer>


<main>
  <slot />
</main>

<!--<footer>-->
<!--    <p><a href="https://sda.pu.go.id">sda.pu.go.id</a></p>-->
<!--</footer>-->

<style>
    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: 0 auto;
        box-sizing: border-box;
    }

    footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /*padding: 100px;*/
    }

    footer a {
        font-weight: bold;
    }

    @media (min-width: 120px) {
        footer {
            /*padding: 40px 0;*/
        }
    }
</style>
