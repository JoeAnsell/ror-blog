require 'rails_helper'

RSpec.describe HelloWorld, type: :model do
  it 'returns hello world' do
    expect(HelloWorld.new.greet).to eq('Hello, World!')
  end
end