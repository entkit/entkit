package ent_project

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/diazoxide/ent-refine/examples/ent-project/ent"
	"github.com/google/uuid"
)

func (r *queryResolver) Node(ctx context.Context, id uuid.UUID) (ent.Noder, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Nodes(ctx context.Context, ids []uuid.UUID) ([]ent.Noder, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Companies(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, orderBy *ent.CompanyOrder, where *ent.CompanyWhereInput, q *string) (*ent.CompanyConnection, error) {
	return r.client.Company.Query().
		Paginate(ctx, after, first, before, last,
			ent.WithCompanyOrder(orderBy),
			ent.WithCompanyFilter(where.ApplySearchQuery(q).Filter),
		)
}

func (r *queryResolver) Countries(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, orderBy *ent.CountryOrder, where *ent.CountryWhereInput, q *string) (*ent.CountryConnection, error) {
	return r.client.Country.Query().
		Paginate(ctx, after, first, before, last,
			ent.WithCountryOrder(orderBy),
			ent.WithCountryFilter(where.ApplySearchQuery(q).Filter),
		)
}

func (r *queryResolver) Emails(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, orderBy *ent.EmailOrder, where *ent.EmailWhereInput, q *string) (*ent.EmailConnection, error) {
	return r.client.Email.Query().
		Paginate(ctx, after, first, before, last,
			ent.WithEmailOrder(orderBy),
			ent.WithEmailFilter(where.ApplySearchQuery(q).Filter),
		)
}

func (r *queryResolver) Images(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, orderBy *ent.ImageOrder, where *ent.ImageWhereInput, q *string) (*ent.ImageConnection, error) {
	return r.client.Image.Query().
		Paginate(ctx, after, first, before, last,
			ent.WithImageOrder(orderBy),
			ent.WithImageFilter(where.ApplySearchQuery(q).Filter),
		)
}

func (r *queryResolver) Locations(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, orderBy *ent.LocationOrder, where *ent.LocationWhereInput, q *string) (*ent.LocationConnection, error) {
	return r.client.Location.Query().
		Paginate(ctx, after, first, before, last,
			ent.WithLocationOrder(orderBy),
			ent.WithLocationFilter(where.ApplySearchQuery(q).Filter),
		)
}

func (r *queryResolver) Phones(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, orderBy *ent.PhoneOrder, where *ent.PhoneWhereInput, q *string) (*ent.PhoneConnection, error) {
	return r.client.Phone.Query().
		Paginate(ctx, after, first, before, last,
			ent.WithPhoneOrder(orderBy),
			ent.WithPhoneFilter(where.ApplySearchQuery(q).Filter),
		)
}

func (r *queryResolver) Products(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, orderBy *ent.ProductOrder, where *ent.ProductWhereInput, q *string) (*ent.ProductConnection, error) {
	return r.client.Product.Query().
		Paginate(ctx, after, first, before, last,
			ent.WithProductOrder(orderBy),
			ent.WithProductFilter(where.ApplySearchQuery(q).Filter),
		)
}

func (r *queryResolver) Vendors(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, orderBy *ent.VendorOrder, where *ent.VendorWhereInput, q *string) (*ent.VendorConnection, error) {
	return r.client.Vendor.Query().
		Paginate(ctx, after, first, before, last,
			ent.WithVendorOrder(orderBy),
			ent.WithVendorFilter(where.ApplySearchQuery(q).Filter),
		)
}

func (r *queryResolver) Warehouses(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, orderBy *ent.WarehouseOrder, where *ent.WarehouseWhereInput, q *string) (*ent.WarehouseConnection, error) {
	return r.client.Warehouse.Query().
		Paginate(ctx, after, first, before, last,
			ent.WithWarehouseOrder(orderBy),
			ent.WithWarehouseFilter(where.ApplySearchQuery(q).Filter),
		)
}

func (r *queryResolver) Websites(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, orderBy *ent.WebsiteOrder, where *ent.WebsiteWhereInput, q *string) (*ent.WebsiteConnection, error) {
	return r.client.Website.Query().
		Paginate(ctx, after, first, before, last,
			ent.WithWebsiteOrder(orderBy),
			ent.WithWebsiteFilter(where.ApplySearchQuery(q).Filter),
		)
}

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
