<script>
export let source = "img/p1.jpg";
export let active = true;
</script>

<img src={source} alt="abstract" width="150" height="150" class={active == false ? "inactive" : ""}>

<style>
.inactive {
    filter: brightness(0) invert(1);
}
</style>