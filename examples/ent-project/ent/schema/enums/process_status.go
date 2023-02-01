package enums

import (
	"fmt"
	"io"
	"strconv"
)

type ProcessStatus string

const (
	ProcessStatusNone       ProcessStatus = "none"
	ProcessStatusDone       ProcessStatus = "done"
	ProcessStatusEnqueued   ProcessStatus = "enqueued"
	ProcessStatusInProgress ProcessStatus = "in_progress"
	ProcessStatusFailed     ProcessStatus = "failed"
)

func (_g ProcessStatus) MarshalGQL(w io.Writer) {
	io.WriteString(w, strconv.Quote(string(_g)))
}

func (_g *ProcessStatus) isValidAction() bool {
	for _, v := range _g.Values() {
		if v == string(*_g) {
			return true
		}
	}
	return false
}

func (_g *ProcessStatus) UnmarshalGQL(val interface{}) error {
	str, ok := val.(string)
	if !ok {
		return fmt.Errorf("enum %T must be a string", val)
	}
	*_g = ProcessStatus(str)

	if !(*_g).isValidAction() {
		return fmt.Errorf("%s is not a valid Gender", str)
	}
	return nil
}
func (ProcessStatus) Values() (kinds []string) {
	for _, s := range []ProcessStatus{
		ProcessStatusNone,
		ProcessStatusDone,
		ProcessStatusEnqueued,
		ProcessStatusInProgress,
		ProcessStatusFailed,
	} {
		kinds = append(kinds, string(s))
	}
	return
}
