use chrono::Local;

fn main() {
    println!("Hello ASL!");
    let today = Local::now().date();
    println!("{}", today.format("%Y-%m-%d"));
}
