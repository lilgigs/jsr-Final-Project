# Final Project - Guest List


## Dos
* Tracks Wedding Guests in Firebase Database
* Can Enter Guests in Entry Box
* Table lists are also tracked
* You can edit guest name, table number, and delete the guest by the icons next to the name.
	* One of the icons also re-shows you visually what table the guest is at.


### Features

* If you are in the array of guests it will add you to a table by your category.
* If you are not in the array you will be added to tables for 'Other' and it will show an alert.
* On guest entry, it will show you visually what table you are at with the table number.
* If a table has 3 or more guests, it will turn the table red to indicate there are too many people.


### Approach

 * I wanted to create a way to assign quests by category and visually show quests at table.
	* I didn't quite get to the visual goal that I wanted.
 * I thought firebase would be best because it is an easy API to get up and running.
 

### Unsolved Problems
 
 * Sometimes the real-time updating doesn't show correctly on the page, but the database does get updated. Refreshing the page fixes it.
 * Alert wasn't given much thought.

### Potential Future Enhancements
 * Code Clean Up - efficiencies can be gained. Too much repeating currently.
 * Show icons around the circles to indicate number of guests.
 * Full Guest list not added.
 * Only 7 tables are functional because of timing.
 * Clean up the visuals to be more appealing. 
