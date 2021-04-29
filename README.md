#URL SHORTENER
<img src="https://res.cloudinary.com/it-s-tech/image/upload/v1619627071/Screen_Shot_2021-04-28_at_17.27.37_hwkucm.png">

### About
This application comes in handy when you want to encrypt the path of URLs. It creates a short version of URLs and allows you to get redirected to the original URL through a redirect button.
It also allows you to see detailed information on previously created URLs.

### Functionalities
- Shortening of URLs
- Redirecting to Original URL
- Display of clicked link analysis
- Loading on redirection
- Display of original Url
- Phone responsiveness

### My approach
I created a Url model to persis URLs in the database to keep a track of records. To avoid page load, I architected the application to be similar to a single page application. I used the fetch API for making the post request and updating URLs behind the wood. I realized redirecting to the original URL on URL creation will not provide room to see URL records after they are created so I decided to separate the creation and redirection processes such that users can see the short form of the URLs they create and click on the redirect button to get redirected to the original site.

# Issues I encountered
1. For a consistent flow of the user experience, I wanted to redirect to a new browser window but I realized some browsers block such redirections especially when it comes from an unsecured source so I had no choice but to redirect on the same window.

### Technologies
- Ruby 2.6.5
- Rails 6.1.3
- Rspec
- Capybara
- Factory_bot
- Stimulus
- Javascript ES6

### Installation And Usage
* Fork the project to your personal Github.
* Clone the challenge to your local from your new forked repo in your git account.
```
  git clone <forked account>
  example: git clone https://github.com/EmirVatric/Chunin-Exam
```
* Cd into the project directory and install gems using the command:
```
bundle install
```
* Start the development server by running the command:
``` 
rails s
```
* visit http://localhost:3000 to view the application on the browser.

### Testing

* For unit test, run:
```
rspec spec/models
```
* To test features:
```
rspec spec/features
```

* To test request:
```
rspec spec/requests
```