from flask import Flask, render_template, request
import requests
import sqlite3 as sql #Import Sqlite

app = Flask("MyApp")

def send_confirmation_message(booking_email, booking_name, booking_date): #Irinas code for using the mailgun API send a confirmation email
	return requests.post(
		"https://api.mailgun.net/v3/sandbox987b713dd9344dc88c145724a2d28d92.mailgun.org/messages",
		auth=("api","4c7dc4bd1c814f264622f67b1eeb69ce-3b1f59cf-225d56b9"),
		data={"from": "The Scarlet Letter <mailgun@sandbox987b713dd9344dc88c145724a2d28d92.mailgun.org>",
			"to" :[booking_email],
			"subject": "Booking confirmation",
			"text": "Dear {}, this is to confirm your booking for {} at The Scarlet Letter Cocktail bar".format(booking_name, booking_date)})

@app.route("/") #app.route is specific to flask and forms the url paths for your web application
def index(): #personally called this method index to represent the fact it will return the index page
    return render_template('index.html') #render_template is a flask specific method that returns the html page you want to display
                                         #render_template .html files are stored in the templates folder (required for flask to work correctly)
@app.route("/menu") #same functionality as above
def menu():
    return render_template('menu.html')

@app.route("/booking") #same functionality as above
def booking():
    return render_template('booking_form.html')

@app.route("/contact")
def contact():
    return render_template('contact.html')

@app.route("/success")
def success():
    return render_template('success.html')

@app.route('/bookingconfirmed',methods = ['POST', 'GET']) #linked to the form action in booking_form with the flask url_for method (line 89 in booking_form)
def bookingconfirmed():
    if request.method == 'POST': #POST is a http request used to send data
        try:
            first_name = request.form['firstname']
            last_name = request.form['lastname']
            email_address = request.form['emailaddress']
            phone_number = request.form['phonenumber']
            number_of_guests = request.form['numberofguests']
            visit_date_time = request.form['visitdatetime']
            visit_duration = request.form['visitduration']

            with sql.connect("database.db") as con: #uses sqlite3 connect method to open a connection to the database named database.db
                cur = con.cursor() #a cursor is an object that databases uses to return/execute queries
                cur.execute("""INSERT INTO The_Scarlet_Letter (FirstName, LastName, EmailAddress,
                PhoneNumber, NumberOfGuests, VisitDateTime, VisitDuration)
                    VALUES (?,?,?,?,?,?,?)""",(first_name, last_name, email_address, phone_number, number_of_guests, visit_date_time, visit_duration))
                    #the code above uses cur.execute to run the SQL that you pass to it, this SQL code does an INSERT
                    #into the table The_Scarlet_Letter with column names matching exactly how they are in the database
                send_confirmation_message(email_address, first_name, visit_date_time) #calls the send_confirmation_message listed above
                con.commit()
            return render_template("success.html")
            con.close()
        except:
            con.rollback()
            #needs a return render_template("error.html") page here which shows that an error occurred and lets user go back to homepage/booking form
if __name__ == '__main__':
    app.run(debug=True)
