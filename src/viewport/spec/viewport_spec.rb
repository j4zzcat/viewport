# frozen_string_literal: true

RSpec.describe Viewport do
  it "has a version number" do
    expect(Viewport::VERSION).not_to be nil
  end
end

RSpec.describe Viewport::Backend do
  it "rejects bad urls" do
    expect { Viewport::Backend.new(["a b c"], nil, nil) }
      .to raise_error Viewport::Error
  end

  it "collects unique protocols" do
    expect(Viewport::Backend.new(%w[h://g.com h://i.com unifi://u:p@host/c], nil, nil).unique_schemes)
        .to contain_exactly("h", "unifi")
  end
end