<template>
  <footer class="footer">
    <div class="container">
      <nav>
        <ul>
          <md-list-item href="#">
            <md-icon>comment</md-icon>
            <p>About Us</p>
          </md-list-item>
          <md-list-item href="#">
            <md-icon>message</md-icon>
            <p>Blog</p>
          </md-list-item>
          <md-list-item href="#">
            <md-icon>location_on</md-icon>
            <p>Map</p>
          </md-list-item>
        </ul>
      </nav>
      <div class="copyright text-center">
        &copy; {{ new Date().getFullYear() }}
        <a
          href="https://support.example.com"
          target="_blank"
        >
          Contact Support Team</a>
      </div>
    </div>
  </footer>
</template>
<script>
export default {};
</script>
<style lang="css">
  .footer {
    p {
      margin-bottom: 0;
    }
  }
  .md-list-item-content>.md-icon:first-child {
      margin-right: 2px;
    }
</style>
