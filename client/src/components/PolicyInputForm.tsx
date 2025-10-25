import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Home, Shield, AlertCircle } from "lucide-react";

interface PolicyData {
  propertyAddress: string;
  propertyType: string;
  constructionYear: string;
  squareFootage: string;
  replacementCost: string;
  dwellingCoverage: string;
  personalPropertyCoverage: string;
  liabilityCoverage: string;
  deductible: string;
  lossOfUseCoverage: string;
  hasFloodCoverage: boolean;
  hasEarthquakeCoverage: boolean;
  claimsLast5Years: string;
  hasMortgage: boolean;
}

interface PolicyInputFormProps {
  onAnalyze: (data: PolicyData) => void;
}

export default function PolicyInputForm({ onAnalyze }: PolicyInputFormProps) {
  const [formData, setFormData] = useState<PolicyData>({
    propertyAddress: "",
    propertyType: "",
    constructionYear: "",
    squareFootage: "",
    replacementCost: "",
    dwellingCoverage: "",
    personalPropertyCoverage: "",
    liabilityCoverage: "",
    deductible: "",
    lossOfUseCoverage: "",
    hasFloodCoverage: false,
    hasEarthquakeCoverage: false,
    claimsLast5Years: "",
    hasMortgage: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Analyzing coverage with data:", formData);
    onAnalyze(formData);
  };

  const updateField = (field: keyof PolicyData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="h-5 w-5" />
          Policy Information
        </CardTitle>
        <CardDescription>
          Enter your current policy details to analyze coverage gaps
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Accordion type="multiple" defaultValue={["property", "coverage"]} className="w-full">
            <AccordionItem value="property" data-testid="accordion-property">
              <AccordionTrigger className="text-base font-semibold">
                Property Information
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyAddress">Property Address</Label>
                  <Input
                    id="propertyAddress"
                    data-testid="input-property-address"
                    placeholder="123 Main St, City, State ZIP"
                    value={formData.propertyAddress}
                    onChange={(e) => updateField("propertyAddress", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Select
                      value={formData.propertyType}
                      onValueChange={(value) => updateField("propertyType", value)}
                    >
                      <SelectTrigger id="propertyType" data-testid="select-property-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single-family">Single Family Home</SelectItem>
                        <SelectItem value="condo">Condominium</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="rental">Rental Property</SelectItem>
                        <SelectItem value="multi-family">Multi-Family</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="constructionYear">Construction Year</Label>
                    <Input
                      id="constructionYear"
                      data-testid="input-construction-year"
                      type="number"
                      placeholder="2000"
                      value={formData.constructionYear}
                      onChange={(e) => updateField("constructionYear", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="squareFootage">Square Footage</Label>
                    <Input
                      id="squareFootage"
                      data-testid="input-square-footage"
                      type="number"
                      placeholder="2000"
                      value={formData.squareFootage}
                      onChange={(e) => updateField("squareFootage", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="replacementCost">Estimated Replacement Cost</Label>
                    <Input
                      id="replacementCost"
                      data-testid="input-replacement-cost"
                      type="number"
                      placeholder="500000"
                      value={formData.replacementCost}
                      onChange={(e) => updateField("replacementCost", e.target.value)}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="coverage" data-testid="accordion-coverage">
              <AccordionTrigger className="text-base font-semibold">
                Current Coverage Details
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dwellingCoverage">Dwelling Coverage (Coverage A)</Label>
                    <Input
                      id="dwellingCoverage"
                      data-testid="input-dwelling-coverage"
                      type="number"
                      placeholder="400000"
                      value={formData.dwellingCoverage}
                      onChange={(e) => updateField("dwellingCoverage", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="personalPropertyCoverage">Personal Property (Coverage C)</Label>
                    <Input
                      id="personalPropertyCoverage"
                      data-testid="input-personal-property"
                      type="number"
                      placeholder="200000"
                      value={formData.personalPropertyCoverage}
                      onChange={(e) => updateField("personalPropertyCoverage", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="liabilityCoverage">Liability Limit (Coverage E)</Label>
                    <Select
                      value={formData.liabilityCoverage}
                      onValueChange={(value) => updateField("liabilityCoverage", value)}
                    >
                      <SelectTrigger id="liabilityCoverage" data-testid="select-liability">
                        <SelectValue placeholder="Select amount" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100000">$100,000</SelectItem>
                        <SelectItem value="300000">$300,000</SelectItem>
                        <SelectItem value="500000">$500,000</SelectItem>
                        <SelectItem value="1000000">$1,000,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deductible">Deductible</Label>
                    <Select
                      value={formData.deductible}
                      onValueChange={(value) => updateField("deductible", value)}
                    >
                      <SelectTrigger id="deductible" data-testid="select-deductible">
                        <SelectValue placeholder="Select amount" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="500">$500</SelectItem>
                        <SelectItem value="1000">$1,000</SelectItem>
                        <SelectItem value="2500">$2,500</SelectItem>
                        <SelectItem value="5000">$5,000</SelectItem>
                        <SelectItem value="10000">$10,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lossOfUseCoverage">Loss of Use / ALE (Coverage D)</Label>
                  <Input
                    id="lossOfUseCoverage"
                    data-testid="input-loss-of-use"
                    type="number"
                    placeholder="80000"
                    value={formData.lossOfUseCoverage}
                    onChange={(e) => updateField("lossOfUseCoverage", e.target.value)}
                  />
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="floodCoverage">Flood Insurance</Label>
                      <p className="text-sm text-muted-foreground">Separate policy coverage</p>
                    </div>
                    <Switch
                      id="floodCoverage"
                      data-testid="switch-flood"
                      checked={formData.hasFloodCoverage}
                      onCheckedChange={(checked) => updateField("hasFloodCoverage", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="earthquakeCoverage">Earthquake Insurance</Label>
                      <p className="text-sm text-muted-foreground">Additional coverage rider</p>
                    </div>
                    <Switch
                      id="earthquakeCoverage"
                      data-testid="switch-earthquake"
                      checked={formData.hasEarthquakeCoverage}
                      onCheckedChange={(checked) => updateField("hasEarthquakeCoverage", checked)}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="additional" data-testid="accordion-additional">
              <AccordionTrigger className="text-base font-semibold">
                Additional Information
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="claimsLast5Years">Number of Claims (Last 5 Years)</Label>
                  <Input
                    id="claimsLast5Years"
                    data-testid="input-claims"
                    type="number"
                    placeholder="0"
                    min="0"
                    value={formData.claimsLast5Years}
                    onChange={(e) => updateField("claimsLast5Years", e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="mortgage">Active Mortgage or Lien</Label>
                    <p className="text-sm text-muted-foreground">Lender requirements may apply</p>
                  </div>
                  <Switch
                    id="mortgage"
                    data-testid="switch-mortgage"
                    checked={formData.hasMortgage}
                    onCheckedChange={(checked) => updateField("hasMortgage", checked)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            data-testid="button-analyze"
          >
            <Shield className="mr-2 h-4 w-4" />
            Analyze Coverage
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
