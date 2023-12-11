<!-- Draws a disk of radius proportional to n, for values of n from 0 to 9 -->
<script>
    export let n = 5;
    // export let size = 3;
    export let base_color_face="white";
    export let base_color_dot="black";
    export let bg_opacity=.9;
    export let width = 160;
    export let height = 160;
    let radius = (width/2-10)*n /9;
    </script>
    <svg width={width} height={height} viewBox="0 0 150 150">
      <rect x="5" y="5" rx="20" ry="20" width="140" height="140" fill={base_color_face} fill-opacity={bg_opacity}/>
      {#if n==9}
      <text x="30" y="130" font-size="150px" fill={base_color_dot} >9</text>
     {:else if n==8}
     <text x="30" y="130" font-size="150px" fill={base_color_dot} >8</text>
     {:else if n==7}
     <text x="30" y="130" font-size="150px" fill={base_color_dot} >7</text>
     {:else if n==6}
     <text x="30" y="130" font-size="150px" fill={base_color_dot} >6</text>
     {:else if n==5}
     <text x="30" y="130" font-size="150px" fill={base_color_dot} >5</text>
     {:else if n==4}
     <text x="30" y="130" font-size="150px" fill={base_color_dot} >4</text>
     {:else if n==3}
     <text x="30" y="130" font-size="150px" fill={base_color_dot} >3</text>
     {:else if n==2}
     <text x="30" y="130" font-size="150px" fill={base_color_dot} >2</text>
     {:else if n==1}
     <text x="30" y="130" font-size="150px" fill={base_color_dot} >1</text>
     {:else if n==0}
     <text x="30" y="130" font-size="150px" fill={base_color_dot} >0</text>
     {/if}
        <!-- <circle cx="30" cy="130" r={radius} fill={base_color_dot} /> -->
    </svg>
    <style>
        rect{
       stroke:black;
       stroke-width:5;
        }
        text{
       stroke:none;
       stroke-width:0;
       }
    </style>