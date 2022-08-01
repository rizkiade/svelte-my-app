<script>
    // import { activeNav } from "../store/control.js";
    import {Tooltip} from "sveltestrap";
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    function sayHello(param) {
        dispatch('action', {
            text: param
        });
    }

    let src;
    let alt;
    let title;
    let name;
    let active;

    export {src, alt, title, name, active}

</script>


<div>
    <button class="btn-landing" id={`btn-${name}`} class:active="{active}" on:click="{sayHello(name)}">
        <img class="img-icon" src="{src}" alt="{alt}">
        <!--{$activeNav.left} {$activeNav.right}-->
    </button>
    <Tooltip target={`btn-${name}`} placement="left">{title}</Tooltip>
</div>

<style>

    .btn-landing {
        background-color: #436bee;
        width: 30px;
        height: 30px;
        border: none;
        border-radius: 8px;
        color: #FFFFFF;
        margin: 5px auto;
        mix-blend-mode: normal;
        box-shadow: inset 4px 4px 4px rgba(36, 52, 107, 0.3);
    }

    .active, .btn-landing:hover {
        cursor: pointer;
        background: #24346A;
        transform: scale(1.2);
        box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
    }

    img.img-icon {
        width: 20px;
        height: 20px;
        margin: 0;
        padding: 0;
    }

    @media screen and (min-width: 760px) {

        .btn-landing {
            width: 35px;
            height: 35px;
            border-radius: 10px;
            margin: 5px auto;
        }

        .active, .btn-landing:hover {
            cursor: pointer;
            box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
        }

        img.img-icon {
            width: 20px;
            height: 20px;
            margin: 0;
            padding: 0;
        }
    }

</style>
