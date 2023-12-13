regular **markdown** here

<div hidden>```plantuml
@startuml
actor "User" as user
participant "Express API" as api
database "MongoDB" as db
actor "Driver" as driver

user -> api: Request for rides
api -> db: Query available rides
db --> api: Ride details
api --> user: Display available rides
user -> api: Request ride booking
api -> db: Confirm booking
db --> api: Booking confirmation
api --> user: Ride booked
user -> api: Confirm ride
api -> driver: Update ride status
driver --> api: Ride updated
api --> user: Ride confirmed
@enduml

</div>