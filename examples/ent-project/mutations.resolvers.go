package ent_project

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/diazoxide/ent-refine/examples/ent-project/ent"
	"github.com/google/uuid"
)

func (r *mutationResolver) CreateVendor(ctx context.Context, input ent.CreateVendorInput) (*ent.Vendor, error) {
	return ent.FromContext(ctx).Vendor.
		Create().
		SetInput(input).
		Save(ctx)
}

func (r *mutationResolver) UpdateVendor(ctx context.Context, id uuid.UUID, input ent.UpdateVendorInput) (*ent.Vendor, error) {
	return ent.FromContext(ctx).Vendor.
		UpdateOneID(id).
		SetInput(input).
		Save(ctx)
}

func (r *mutationResolver) DeleteVendors(ctx context.Context, where ent.VendorWhereInput) (int, error) {
	p, err := where.P()
	if err != nil {
		return 0, err
	}
	return ent.FromContext(ctx).Vendor.
		Delete().
		Where(p).
		Exec(ctx)
}

func (r *mutationResolver) CreateWarehouse(ctx context.Context, input ent.CreateWarehouseInput) (*ent.Warehouse, error) {
	return ent.FromContext(ctx).Warehouse.
		Create().
		SetInput(input).
		Save(ctx)
}

func (r *mutationResolver) UpdateWarehouse(ctx context.Context, id uuid.UUID, input ent.UpdateWarehouseInput) (*ent.Warehouse, error) {
	return ent.FromContext(ctx).Warehouse.
		UpdateOneID(id).
		SetInput(input).
		Save(ctx)
}

func (r *mutationResolver) DeleteWarehouses(ctx context.Context, where ent.WarehouseWhereInput) (int, error) {
	p, err := where.P()
	if err != nil {
		return 0, err
	}
	return ent.FromContext(ctx).Warehouse.
		Delete().
		Where(p).
		Exec(ctx)
}

func (r *mutationResolver) CreateProduct(ctx context.Context, input ent.CreateProductInput) (*ent.Product, error) {
	return ent.FromContext(ctx).Product.
		Create().
		SetInput(input).
		Save(ctx)
}

func (r *mutationResolver) UpdateProduct(ctx context.Context, id uuid.UUID, input ent.UpdateProductInput) (*ent.Product, error) {
	return ent.FromContext(ctx).Product.
		UpdateOneID(id).
		SetInput(input).
		Save(ctx)
}

func (r *mutationResolver) DeleteProducts(ctx context.Context, where ent.ProductWhereInput) (int, error) {
	p, err := where.P()
	if err != nil {
		return 0, err
	}
	return ent.FromContext(ctx).Product.
		Delete().
		Where(p).
		Exec(ctx)
}

func (r *mutationResolver) CreateCompany(ctx context.Context, input ent.CreateCompanyInput) (*ent.Company, error) {
	return ent.FromContext(ctx).Company.
		Create().
		SetInput(input).
		Save(ctx)
}

func (r *mutationResolver) UpdateCompany(ctx context.Context, id uuid.UUID, input ent.UpdateCompanyInput) (*ent.Company, error) {
	return ent.FromContext(ctx).Company.
		UpdateOneID(id).
		SetInput(input).
		Save(ctx)
}

func (r *mutationResolver) DeleteCompanies(ctx context.Context, where ent.CompanyWhereInput) (int, error) {
	p, err := where.P()
	if err != nil {
		return 0, err
	}
	return ent.FromContext(ctx).Company.
		Delete().
		Where(p).
		Exec(ctx)
}

func (r *mutationResolver) CreateCountry(ctx context.Context, input ent.CreateCountryInput) (*ent.Country, error) {
	return ent.FromContext(ctx).Country.
		Create().
		SetInput(input).
		Save(ctx)
}

func (r *mutationResolver) UpdateCountry(ctx context.Context, id uuid.UUID, input ent.UpdateCountryInput) (*ent.Country, error) {
	return ent.FromContext(ctx).Country.
		UpdateOneID(id).
		SetInput(input).
		Save(ctx)
}

func (r *mutationResolver) DeleteCountries(ctx context.Context, where ent.CountryWhereInput) (int, error) {
	p, err := where.P()
	if err != nil {
		return 0, err
	}
	return ent.FromContext(ctx).Country.
		Delete().
		Where(p).
		Exec(ctx)
}

func (r *mutationResolver) CreatePhone(ctx context.Context, input ent.CreatePhoneInput) (*ent.Phone, error) {
	return ent.FromContext(ctx).Phone.
		Create().
		SetInput(input).
		Save(ctx)
}

func (r *mutationResolver) UpdatePhone(ctx context.Context, id uuid.UUID, input ent.UpdatePhoneInput) (*ent.Phone, error) {
	return ent.FromContext(ctx).Phone.
		UpdateOneID(id).
		SetInput(input).
		Save(ctx)
}

func (r *mutationResolver) DeletePhones(ctx context.Context, where ent.PhoneWhereInput) (int, error) {
	p, err := where.P()
	if err != nil {
		return 0, err
	}
	return ent.FromContext(ctx).Phone.
		Delete().
		Where(p).
		Exec(ctx)
}

func (r *mutationResolver) CreateLocation(ctx context.Context, input ent.CreateLocationInput) (*ent.Location, error) {
	return ent.FromContext(ctx).Location.
		Create().
		SetInput(input).
		Save(ctx)
}

func (r *mutationResolver) UpdateLocation(ctx context.Context, id uuid.UUID, input ent.UpdateLocationInput) (*ent.Location, error) {
	return ent.FromContext(ctx).Location.
		UpdateOneID(id).
		SetInput(input).
		Save(ctx)
}

func (r *mutationResolver) DeleteLocations(ctx context.Context, where ent.LocationWhereInput) (int, error) {
	p, err := where.P()
	if err != nil {
		return 0, err
	}
	return ent.FromContext(ctx).Location.
		Delete().
		Where(p).
		Exec(ctx)
}

func (r *mutationResolver) CreateWebsite(ctx context.Context, input ent.CreateWebsiteInput) (*ent.Website, error) {
	return ent.FromContext(ctx).Website.
		Create().
		SetInput(input).
		Save(ctx)
}

func (r *mutationResolver) UpdateWebsite(ctx context.Context, id uuid.UUID, input ent.UpdateWebsiteInput) (*ent.Website, error) {
	return ent.FromContext(ctx).Website.
		UpdateOneID(id).
		SetInput(input).
		Save(ctx)
}

func (r *mutationResolver) DeleteWebsites(ctx context.Context, where ent.WebsiteWhereInput) (int, error) {
	p, err := where.P()
	if err != nil {
		return 0, err
	}
	return ent.FromContext(ctx).Website.
		Delete().
		Where(p).
		Exec(ctx)
}

func (r *mutationResolver) CreateEmail(ctx context.Context, input ent.CreateEmailInput) (*ent.Email, error) {
	return ent.FromContext(ctx).Email.
		Create().
		SetInput(input).
		Save(ctx)
}

func (r *mutationResolver) UpdateEmail(ctx context.Context, id uuid.UUID, input ent.UpdateEmailInput) (*ent.Email, error) {
	return ent.FromContext(ctx).Email.
		UpdateOneID(id).
		SetInput(input).
		Save(ctx)
}

func (r *mutationResolver) DeleteEmails(ctx context.Context, where ent.EmailWhereInput) (int, error) {
	p, err := where.P()
	if err != nil {
		return 0, err
	}
	return ent.FromContext(ctx).Email.
		Delete().
		Where(p).
		Exec(ctx)
}

func (r *mutationResolver) CreateImage(ctx context.Context, input ent.CreateImageInput) (*ent.Image, error) {
	return ent.FromContext(ctx).Image.
		Create().
		SetInput(input).
		Save(ctx)
}

func (r *mutationResolver) UpdateImage(ctx context.Context, id uuid.UUID, input ent.UpdateImageInput) (*ent.Image, error) {
	return ent.FromContext(ctx).Image.
		UpdateOneID(id).
		SetInput(input).
		Save(ctx)
}

func (r *mutationResolver) DeleteImages(ctx context.Context, where ent.ImageWhereInput) (int, error) {
	p, err := where.P()
	if err != nil {
		return 0, err
	}
	return ent.FromContext(ctx).Image.
		Delete().
		Where(p).
		Exec(ctx)
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
