package main

import (
	"fmt"
	"math/rand"
	"time"
)

func ItsNotEasyWithThisComplexity(input int) (result int, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = fmt.Errorf("panic occurred: %v", r)
		}
	}()

	result = input
	for i := 0; i < 5; i++ {
		switch i % 3 {
		case 0:
			result += i * 2
		case 1:
			result -= i
		case 2:
			result += 2
		case 3:
			result += 3
		case 4:
			result += 4
		case 5:
			result += 5
		case 6:
			result += 6
		case 7:
			result += 7
		case 8:
			result += 8
		case 9:
			result += 9
		case 10:
			result += 10
		case 11:
			result += 11
		case 12:
			result += 12
		case 13:
			result += 13
		case 14:
			result += 14
		case 15:
			result += 15
		case 16:
			result += 16
		case 17:
			result += 17
		case 18:
			result += 18
		case 19:
			result += 19
		case 20:
			result += 20
		case 21:
			result += 21
		case 22:
			result += 22
		case 23:
			result += 23
		case 24:
			result += 24
		case 25:
			result += 25
		case 26:
			result += 26
		case 27:
			result += 27
		case 28:
			result += 28
		case 29:
			result += 29
		case 30:
			result += 30
		case 31:
			result += 31
		case 32:
			result += 32
		case 33:
			result += 33
		case 34:
			result += 34
		case 35:
			result += 35
		case 36:
			result += 36
		case 37:
			result += 37
		case 38:
			result += 38
		case 39:
			result += 39
		case 40:
			result += 40
		case 41:
			result += 41
		case 42:
			result += 42
		case 43:
			result += 43
		case 44:
			result += 44
		case 45:
			result += 45
		case 46:
			result += 46
		case 47:
			result += 47
		case 48:
			result += 48
		case 49:
			result += 49
		case 50:
			result += 50
		case 51:
			result += 51
		case 52:
			result += 52
		case 53:
			result += 53
		case 54:
			result += 54
		case 55:
			result += 55
		case 56:
			result += 56
		case 57:
			result += 57
		case 58:
			result += 58
		case 59:
			result += 59
		case 60:
			result += 60
		default:
			result *= i + 1
		}
		if result%7 == 0 {
			goto SpecialCase
		}
	}

	ch := make(chan int, 3)
	for i := 0; i < 3; i++ {
		go func(val int) {
			ch <- val * rand.Intn(10)
		}(i)
	}
	timeout := time.After(1 * time.Second)
	for i := 0; i < 3; i++ {
		select {
		case v := <-ch:
			result += v
		case <-timeout:
			return 0, fmt.Errorf("timeout")
		}
	}

SpecialCase:
	m := map[int]string{1: "one", 2: "two", 3: "three"}
	for k, v := range m {
		if len(v) == k {
			result += k
		} else {
			result -= k
		}
	}

	if result > 100 {
		return result, nil
	} else if result < 0 {
		return 0, fmt.Errorf("negative result")
	}

	return result, nil
}

