package entkit

// StringP returns a pointer of a string variable
func StringP(value string) *string {
	return &value
}

// PString returns a string value from a pointer
func PString(value *string) string {
	if value == nil {
		return ""
	}
	return *value
}

// BoolP returns a pointer of a boolean variable
func BoolP(value bool) *bool {
	return &value
}

// PBool returns a boolean value from a pointer
func PBool(value *bool) bool {
	if value == nil {
		return false
	}
	return *value
}

// IntP returns a pointer of an integer variable
func IntP(value int) *int {
	return &value
}

// Int32P returns a pointer of an int32 variable
func Int32P(value int32) *int32 {
	return &value
}

// Int64P returns a pointer of an int64 variable
func Int64P(value int64) *int64 {
	return &value
}

// PInt returns an integer value from a pointer
func PInt(value *int) int {
	if value == nil {
		return 0
	}
	return *value
}

// PInt32 returns an int32 value from a pointer
func PInt32(value *int32) int32 {
	if value == nil {
		return 0
	}
	return *value
}

// PInt64 returns an int64 value from a pointer
func PInt64(value *int64) int64 {
	if value == nil {
		return 0
	}
	return *value
}
