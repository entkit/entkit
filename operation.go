package entkit

// Operation struct
type Operation struct {
	Mutation       *bool     `json:"Mutation,omitempty"`       // Mark operation as mutation
	Query          *bool     `json:"Query,omitempty"`          // Mark operation as query
	Name           *string   `json:"Name,omitempty"`           // Operation of graphql
	Fields         *[]string `json:"Fields,omitempty"`         // Fields to take after operation
	Single         *bool     `json:"Single,omitempty"`         // Show on single item
	Bulk           *bool     `json:"Bulk,omitempty"`           // Show on bulk selected items
	SuccessMessage *string   `json:"SuccessMessage,omitempty"` // Message on success
	FailMessage    *string   `json:"FailMessage,omitempty"`    // Message on fail
}

type OperationOption = func(operation *Operation) error

// NewOperation creates new operation
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

// OperationWithSuccessMessage sets success message
func OperationWithSuccessMessage(message string) OperationOption {
	return func(op *Operation) (err error) {
		op.SuccessMessage = &message
		return nil
	}
}

// OperationWithFailMessage sets fail message
func OperationWithFailMessage(message string) OperationOption {
	return func(op *Operation) (err error) {
		op.FailMessage = &message
		return nil
	}
}

// OperationWithFields sets fields
func OperationWithFields(fields []string) OperationOption {
	return func(op *Operation) (err error) {
		op.Fields = &fields
		return nil
	}
}

// OperationAsBulk marks operation as bulk
func OperationAsBulk() OperationOption {
	return func(op *Operation) (err error) {
		op.Single = BoolP(false)
		op.Bulk = BoolP(true)
		return nil
	}
}

// OperationAsSingle marks operation as single
func OperationAsSingle() OperationOption {
	return func(op *Operation) (err error) {
		op.Bulk = BoolP(false)
		op.Single = BoolP(true)
		return nil
	}
}

// OperationAsMutation marks operation as mutation
func OperationAsMutation() OperationOption {
	return func(op *Operation) (err error) {
		op.Query = BoolP(false)
		op.Mutation = BoolP(true)
		return nil
	}
}

// OperationAsQuery marks operation as query
func OperationAsQuery() OperationOption {
	return func(op *Operation) (err error) {
		op.Mutation = BoolP(false)
		op.Query = BoolP(true)
		return nil
	}
}
