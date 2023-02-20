<script>
    import "../app.postcss";
    import { page } from '$app/stores';

    $: title = (() => {
        switch ($page.route.id) {
            case "/admin-portal": return "ADMIN PORTAL | Home"
            case "/admin-portal/user": return "ADMIN PORTAL | Manage User"
            case "/admin-portal/category": return "ADMIN PORTAL | Manage Category"
            case "/admin-portal/forum": return "ADMIN PORTAL | Manage Forum"

            case "/login": return "SU Webboard | Sign in"
            case "/": return "SU Webboard | Home"
        }
    })()
</script>

<slot></slot>

<svelte:head>
    <title>{ title }</title>
    <link rel="icon" href="/favicon.png">
</svelte:head>