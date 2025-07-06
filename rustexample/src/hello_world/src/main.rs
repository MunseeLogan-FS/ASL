use chrono::{Datelike, Local};

fn main() {
    println!("Hello ASL");
    let now = Local::now();
    println!("Date: {}/{}/{}", now.month(), now.day(), now.year());
}
