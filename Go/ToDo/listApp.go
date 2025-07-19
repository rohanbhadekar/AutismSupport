package main

import (
	"fmt"
)

func main() {
	fmt.Println("hi Todo")
	var item string
	var todo []string

	for {
		fmt.Println("Enter your to do item :")
		fmt.Scanln(&item)
		if item == "quit" {
			break
		}
		todo = append(todo, item)

	}

	for i, v := range todo {
		fmt.Printf("%d: %s\n", i, v)
	}
}
