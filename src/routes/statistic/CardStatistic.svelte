<script>
	import { fly, slide } from "svelte/transition";

</script>

<div class="card mt-lg-3" in:fly="{{ y: 200, duration: 2000 }}" out:slide>
  <div class="card-header text-center">
    <slot name="title" />
  </div>

  <div class="card-body text-center">
    <h5 class="card-title text-center">Statistic</h5>

    <slot>
      <h4>no content was provided</h4>
    </slot>
    <br>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>

  <div class="card-footer text-muted">
    2 days ago
  </div>
</div>