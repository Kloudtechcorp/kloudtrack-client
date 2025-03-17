export const WelcomeMessage = () => {
  return (
    <div className="pb-6">
      <p className="leading-7">
        Welcome to Kloudtrack by Kloudtech, your official weather monitoring
        hub! 🌤️ <br></br>
        If you landed here by mistake, head over to our{" "}
        <a
          className="text-blue-400 hover:text-blue-300 dark:text-blue-400 dark:hover:text-blue-300"
          href="http://kloudtrack.kloudtechsea.com"
        >
          public website
        </a>
        . <br></br>
        Otherwise, let's dive into some weather tracking fun!
      </p>
    </div>
  );
};
