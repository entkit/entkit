package entrefine

type Operation struct {
	Mutation       *bool     `json:"Mutation,omitempty"`
	Query          *bool     `json:"Query,omitempty"`
	Name           *string   `json:"Name,omitempty"`           // Operation of graphql
	Fields         *[]string `json:"Fields,omitempty"`         // Fields to take after operation
	Single         *bool     `json:"Single,omitempty"`         // Show on single item
	Bulk           *bool     `json:"Bulk,omitempty"`           // Show on bulk selected items
	SuccessMessage *string   `json:"SuccessMessage,omitempty"` // Message on success
	FailMessage    *string   `json:"FailMessage,omitempty"`    // Message on fail
}

type OperationOption = func(operation *Operation) error

func NewOperation(name string, options ...OperationOption) *Operation {
	action := &Operation{
		Name: StringP(name),
	}
	for _, opt := range options {
		if err := opt(action); err != nil {
			panic(err)
		}
	}
	return action
}

func OperationWithSuccessMessage(message string) OperationOption {
	return func(op *Operation) (err error) {
		op.SuccessMessage = &message
		return nil
	}
}

func OperationWithFailMessage(message string) OperationOption {
	return func(op *Operation) (err error) {
		op.FailMessage = &message
		return nil
	}
}

func OperationWithFields(fields []string) OperationOption {
	return func(op *Operation) (err error) {
		op.Fields = &fields
		return nil
	}
}

func OperationAsBulk() OperationOption {
	return func(op *Operation) (err error) {
		op.Single = BoolP(false)
		op.Bulk = BoolP(true)
		return nil
	}
}

func OperationType() OperationOption {
	return func(op *Operation) (err error) {
		op.Single = BoolP(false)
		op.Bulk = BoolP(true)
		return nil
	}
}

func OperationAsSingle() OperationOption {
	return func(op *Operation) (err error) {
		op.Bulk = BoolP(false)
		op.Single = BoolP(true)
		return nil
	}
}

func OperationAsMutation() OperationOption {
	return func(op *Operation) (err error) {
		op.Query = BoolP(false)
		op.Mutation = BoolP(true)
		return nil
	}
}

func OperationAsQuery() OperationOption {
	return func(op *Operation) (err error) {
		op.Mutation = BoolP(false)
		op.Query = BoolP(true)
		return nil
	}
}
