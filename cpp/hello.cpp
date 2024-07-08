#include <iostream>
#include <ctime>

int main() {
    std::cout << "Hello ASL!" << std::endl;
    time_t t = time(0);
    struct tm * now = localtime(&t);
    std::cout << (now->tm_year + 1900) << '-' 
              << (now->tm_mon + 1) << '-'
              << now->tm_mday
              << std::endl;
    return 0;
}
