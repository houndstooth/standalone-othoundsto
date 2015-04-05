# COUNTERCLOCKWISE FROM STRAIGHT OUT TO THE RIGHT
def rotate_about_origin(pos, radians)
  dist = Math.sqrt( pos[0] ** 2 + pos[1] ** 2 )
  # puts "dist: #{dist}"
  if pos[0] == 0
    cur_angle = pos[1] > 0 ? Math::PI / 2 : - Math::PI / 2
    # puts "cur_angle A: #{cur_angle}"
  else
    cur_angle = Math.atan(pos[1].fdiv(pos[0]))
    # puts "cur_angle B: #{cur_angle}"
  end
  new_angle = cur_angle + radians
#  puts "new_angle: #{new_angle}"

  [ dist * Math.cos(new_angle) , dist * Math.sin(new_angle) ]
end

HOUNDSTOOTH = [
  [0,2],
  [1,2],
  [2,0],
  [2,1],
  [2,2],
  [2,3],
  [2,4],
  [3,2],
  [3,4],
  [4,2],
  [4,3],
  [4,4],
  [4,5],
  [5,4]
]

def rotated_houndstooth(radians)
  HOUNDSTOOTH.map { |vertex| rotate_about_origin(vertex, radians) }
end

def degrees_to_radians(degrees)
  degrees * Math::PI / 180
end

def tuning_of_houndstooth(houndstooth)
  pitches = houndstooth.map { |vertex| vertex[1] }
#  puts pitches
  pitches.map { |pitch| ((pitch - pitches.min) % 4 * 300).round(3) }.uniq.sort
end

def set_of_tunings(set_of_rotations)
  set_of_rotations.map do |rotation|
    tuning_of_houndstooth(rotated_houndstooth(rotation))
  end
end

SLOPES = [
  "infinity",
  "4",
  "3",
  "5/2",
  "2",
  "3/2",
  "4/3",
  "1",
  "3/4",
  "2/3",
  "1/2",
  "2/5",
  "1/3",
  "1/4",
  "0",
  "-1/4",
  "-1/3",
  "-2/5",
  "-1/2",
  "-2/3",
  "-3/4",
  "-1",
  "-4/3",
  "-3/2",
  "-2",
  "-5/2",
  "-3",
  "-4",
  "-infinity"
]

#SLOPES_OF_HOUNDSTOOTH_VERTEX_ALIGNMENTS_CORRESPONDING_TO_ROTATIONS
ROTATIONS_IN_RADIANS = [
  1.570796327,
  1.325817664,
  1.249045772,
  1.19028995,
  1.107148718,
  0.9827937232,
  0.927295218,
  0.7853981634,
  0.6435011088,
  0.5880026035,
  0.463647609,
  0.3805063771,
  0.3217505544,
  0.2449786631,
  0,
  -0.2449786631,
  -0.3217505544,
  -0.3805063771,
  -0.463647609,
  -0.5880026035,
  -0.6435011088,
  -0.7853981634,
  -0.927295218,
  -0.9827937232,
  -1.107148718,
  -1.19028995,
  -1.249045772,
  -1.325817664,
  -1.570796327
]

f = File.open("sample.txt", "w")

set_of_tunings(ROTATIONS_IN_RADIANS).each_with_index do |tuning, index|
  f.puts "Tuning for #{SLOPES[index]}, radians: #{ROTATIONS_IN_RADIANS[index]}"
  f.puts tuning
  f.puts ""
end

f.close
